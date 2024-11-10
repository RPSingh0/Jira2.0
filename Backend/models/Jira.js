const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const Project = require("./Project");
const Feature = require("./Feature");
const User = require("./User");

class Jira {
    constructor(summary, jiraKey, jiraType, description, jiraLink) {
        this.summary = summary;
        this.jiraKey = jiraKey;
        this.jiraType = jiraType;
        this.description = description;
        this.jiraLink = jiraLink
    }

    /**
     * A static method to build jira using the builder pattern
     *
     * @returns {Jira} A new instance of Jira class
     */
    static create() {
        return new Jira();
    }

    /**
     * Jira summary setter, validates for null values
     *
     * @param {string} summary
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setSummary(summary) {
        if (!summary) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Jira summary is required.'
            })
        }

        this.summary = summary;
        return this;
    }

    /**
     * Jira key setter, validates for null values
     *
     * @param {string} jiraKey
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setJiraKey(jiraKey) {
        if (!jiraKey) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Jira key is required.'
            })
        }

        this.jiraKey = jiraKey;
        return this;
    }

    /**
     * Type setter, validates status to be one of `bug` or `userStory`
     *
     * @param {string} jiraType
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setJiraType(jiraType) {
        const validTypes = ['bug', 'userStory'];
        if (!validTypes.includes(jiraType)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: `Type must be one of: ${validTypes.join(', ')}.`,
            });
        }
        this.jiraType = jiraType;
        return this;
    }

    /**
     * Jira description setter, validates for null values
     *
     * @param {string} description
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setDescription(description) {
        if (!description) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Jira description is required.'
            })
        }

        this.description = description;
        return this;
    }

    /**
     * Jira link setter, validates for null values
     *
     * @param {string} jiraLink
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setJiraLink(jiraLink) {
        if (!jiraLink) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Jira link is required.'
            })
        }

        this.jiraLink = jiraLink;
        return this;
    }

    /**
     * Validates all required fields are present, finalize and returns the Jira object
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['summary', 'type', 'description', 'jiraLink'];

        const validatedAllFields = requiredFields.reduce((acc, field) => {
            if (!this[field]) {
                return `${field} is required. `;
            }

            return '';
        }, '');

        if (validatedAllFields.length > 0) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: validatedAllFields
            });
        }

        return this;
    }

    /**
     * Builds and saves the Jira to database along with metadata
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database insert operation
     *
     * @throws {ErrorInterceptor} Throws error if any required fields are missing or if there is a database error
     */
    async save(metadata) {

        // build jira object for null values check
        this.build();

        // partialBuild the metadata object for null values check
        metadata = metadata.build();

        // check for project existence
        const project = await Project.findByProjectKey(metadata.projectKey);

        if (!project) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such project available'
            });
        }

        // check for feature existence
        const feature = await Feature.findFeatureByProjectKeyAndFeatureKey(metadata.projectKey, metadata.featureKey);

        if (!feature) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such feature available'
            });
        }

        // check for assignee id existence
        const assignee = await User.findByEmail(metadata.assignee);

        if (!assignee) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (assignee)'
            });
        }

        // check for reporter id existence
        const reporter = await User.findByEmail(metadata.reporter);

        if (!reporter) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (reporter)'
            });
        }

        // start transaction
        await dbPromise.beginTransaction();

        // save the jira object first
        const jiraQuery = `
            INSERT INTO Jira (summary, jira_key, jira_type, description, jira_link)
            VALUES (?, ?, ?, ?, ?)`;

        const jiraValues = [this.summary, this.jiraKey, this.jiraType, this.description, this.jiraLink];
        let jiraSavedId = null;

        try {
            const [{insertId: id}] = await dbPromise.execute(jiraQuery, jiraValues);
            jiraSavedId = id;
        } catch (err) {
            // rollback
            await dbPromise.rollback();

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error saving Jira: ${err.message}`,
            });
        }

        // save metadata object
        const metadataQuery = `
            INSERT INTO Metadata (jira_key, jira_point, project_key, feature_key, assignee, reporter, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const metadataValues = [metadata.jiraKey, metadata.jiraPoint, metadata.projectKey, metadata.featureKey, metadata.assignee, metadata.reporter, metadata.status];
        let metadataSavedId = null;

        try {
            const [{insertId: id}] = await dbPromise.execute(metadataQuery, metadataValues);
            metadataSavedId = id;
        } catch (err) {
            // rollback
            await dbPromise.rollback();

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error saving Metadata: ${err.message}`,
            });
        }

        // commit transaction
        await dbPromise.commit();

        // return id for both jira and metadata
        return {
            jiraId: jiraSavedId,
            jiraKey: this.jiraKey,
            metadataId: metadataSavedId,
        }
    }

    /**
     * Takes in a project key as input, checks against the db for next jira key sequence
     *
     * @param projectKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async generateJiraKeySequence(projectKey) {
        const query = `
            SELECT COUNT(*) as count
            FROM Jira
            WHERE jira_key LIKE ?`;

        try {
            const [results] = await dbPromise.execute(query, [`${projectKey}%`]);
            return results[0].count;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a jiraKey key as input and returns the jira details using jiraKey
     *
     * @param jiraKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraDetailsByJiraKey(jiraKey) {

        const query = `
            SELECT summary,
                   jira_key  AS jiraKey,
                   jira_type as jiraType,
                   description,
                   jira_link AS jiraLink
            FROM Jira
            WHERE jira_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [jiraKey]);
            return results[0];
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a project key and feature key to return all the jira present
     *
     * @param projectKey
     * @param featureKey
     *
     * @returns {Promise<*>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraByProjectKeyAndFeatureKey(projectKey, featureKey) {

        const query = `
            SELECT J.summary,
                   J.jira_type                                            AS jiraType,
                   J.jira_key                                             AS jiraKey,
                   J.jira_link                                            AS jiraLink,
                   CONCAT(UAT.first_name, ' ', IFNULL(UAT.last_name, '')) AS assigneeName,
                   UAT.email                                              AS assigneeEmail,
                   UAT.profile_image                                      AS assigneeProfileImage,
                   S.type                                                 AS statusType
            FROM Jira AS J
                     INNER JOIN Metadata AS M ON J.jira_key = M.jira_key
                     INNER JOIN User AS UAT ON M.assignee = UAT.email
                     INNER JOIN Status AS S ON M.status = S.id
            WHERE M.project_key = ?
              AND M.feature_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [projectKey, featureKey]);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a user email and return all the jira user worked on or created
     *
     * @param email
     * @param type
     *
     * @returns {Promise<*>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraByUserEmail(email, type) {

        let query = `
            SELECT J.summary,
                   J.jira_type                                            AS jiraType,
                   J.jira_key                                             AS jiraKey,
                   J.jira_link                                            AS jiraLink,
                   CONCAT(UAT.first_name, ' ', IFNULL(UAT.last_name, '')) AS assigneeName,
                   UAT.email                                              AS assigneeEmail,
                   UAT.profile_image                                      AS assigneeProfileImage,
                   S.type                                                 AS statusType
            FROM Jira AS J
                     INNER JOIN Metadata AS M ON J.jira_key = M.jira_key
                     INNER JOIN User AS UAT ON M.assignee = UAT.email
                     INNER JOIN Status AS S ON M.status = S.id
            WHERE (M.assignee = ?
                OR M.reporter = ?)`;

        let params = [email, email];

        if (type) {
            query += ` AND J.jira_type = ?`;
            params.push(type);
        }

        try {
            const [results] = await dbPromise.execute(query, params);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a jiraKey and description as input and updates jira description
     *
     * @param jiraKey
     * @param description
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateJiraDescriptionByJiraKey(jiraKey, description) {

        const query = `
            UPDATE Jira
            SET description = ?
            WHERE jira_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [description, jiraKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira description: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a jiraKey and summary as input and updates jira summary
     *
     * @param jiraKey
     * @param summary
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateJiraSummaryByJiraKey(jiraKey, summary) {

        const query = `
            UPDATE Jira
            SET summary = ?
            WHERE jira_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [summary, jiraKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira summary: ${err.message}`,
            })
        }
    }
}

module.exports = Jira;