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
        const requiredFields = ['summary', 'type', 'description'];

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
        metadata = metadata.partialBuild();

        // check for project id existence
        const projectId = await Project.findById(metadata.projectId);

        if (!projectId) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such project available'
            });
        }

        // check for feature id existence
        const featureId = await Feature.findFeatureByProjectIdAndFeatureId(metadata.projectId, metadata.featureId);

        if (!featureId) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such feature available'
            });
        }

        // check for assignedTo id existence
        const assignedTo = await User.findById(metadata.assignedTo);

        if (!assignedTo) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (assigned to)'
            });
        }

        // check for createdBy id existence
        const createdBy = await User.findById(metadata.createdBy);

        if (!createdBy) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (created by)'
            });
        }

        // get next jira key
        let jiraKeySequence = await Jira.generateJiraKeySequence(metadata.projectId);

        // set jira key
        this.setJiraKey(`${projectId.project_key}-${jiraKeySequence + 1}`);

        // set the jira link
        this.setJiraLink(`/project/${projectId.project_key}/feature/${featureId.feature_key}/${this.jiraKey}`);

        // start transaction
        await dbPromise.beginTransaction();

        // save the jira object first

        const jiraQuery = 'INSERT INTO Jira (summary, jira_key, jira_type, description, jira_link) VALUES (?, ?, ?, ?, ?)';
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

        // add created jira id to metadata object
        metadata.setJiraId(jiraSavedId);

        // save metadata object
        const metadataQuery = 'INSERT INTO Metadata (jira_id, jira_point, project_id, feature_id, assigned_to, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const metadataValues = [metadata.jiraId, metadata.jiraPoint, metadata.projectId, metadata.featureId, metadata.assignedTo, metadata.createdBy, metadata.status];
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
     * Takes in a project id as input, checks against the db for next jira key sequence
     *
     * @param projectId
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async generateJiraKeySequence(projectId) {
        const getProjectKeyQuery = 'SELECT project_key FROM Project WHERE id = ?';
        const getCurrentJiraSequenceQuery = 'SELECT COUNT(*) as count FROM Jira WHERE jira_key LIKE ?';

        try {
            const [resultsA] = await dbPromise.execute(getProjectKeyQuery, [projectId]);
            const projectKey = resultsA[0].project_key;

            const [results] = await dbPromise.execute(getCurrentJiraSequenceQuery, [`${projectKey}%`]);
            return results[0].count;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a jiraKey id as input and returns the jira details using jiraKey
     *
     * @param jiraKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraDetailsByJiraKey(jiraKey) {

        const query = `
            SELECT J.summary,
                   J.description,
                   J.jira_key                                             AS jiraKey,
                   M.jira_point                                           AS jiraPoint,
                   UAT.id                                                 AS userAssignedToId,
                   CONCAT(UAT.first_name, ' ', IFNULL(UAT.last_name, '')) AS userAssignedToName,
                   UAT.email                                              AS userAssignedToEmail,
                   UCB.id                                                 AS userCreatedById,
                   CONCAT(UCB.first_name, ' ', IFNULL(UCB.last_name, '')) AS userCreatedByName,
                   UCB.email                                              AS userCreatedByEmail,
                   P.id                                                   AS projectId,
                   P.project_key                                          AS projectKey,
                   F.id                                                   AS featureId,
                   F.feature_key                                          AS featureKey,
                   S.id                                                   AS statusId,
                   S.type                                                 AS statusType,
                   M.created_on                                           AS createdOn
            FROM Jira AS J
                     INNER JOIN Metadata AS M ON J.id = M.jira_id
                     INNER JOIN User AS UAT ON M.assigned_to = UAT.id
                     INNER JOIN User AS UCB ON M.created_by = UCB.id
                     INNER JOIN Project AS P ON M.project_id = P.id
                     INNER JOIN Feature AS F ON M.feature_id = F.id
                     INNER JOIN Status AS S ON M.status = S.id
            WHERE J.jira_key = ?`

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

        const query = 'UPDATE Jira SET description = ? WHERE jira_key = ?';

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
     * Get jira id by jira key
     *
     * @param jiraKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraIdByJiraKey(jiraKey) {

        const query = 'SELECT id FROM Jira where jira_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [jiraKey]);
            return results[0];

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching jira id: ${err.message}`,
            })
        }
    }
}

module.exports = Jira;