const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const Project = require("./Project");
const Feature = require("./Feature");
const User = require("./User");

class Jira {
    constructor(summary, jiraKey, jiraType, description) {
        this.summary = summary;
        this.jiraKey = jiraKey;
        this.jiraType = jiraType;
        this.description = description;
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
     * Validates all required fields are present, finalize and returns the Jira object
     *
     * @returns {Jira}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['summary', 'jiraKey', 'type', 'description'];

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

        // start transaction
        await dbPromise.beginTransaction();

        // save the jira object first

        const jiraQuery = 'INSERT INTO Jira (summary, jira_key, jira_type, description) VALUES (?, ?, ?, ?)';
        const jiraValues = [this.summary, this.jiraKey, this.jiraType, this.description];
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
        const metadataQuery = 'INSERT INTO Metadata (jira_id, project_id, feature_id, assigned_to, created_by, status) VALUES (?, ?, ?, ?, ?, ?)';
        const metadataValues = [metadata.jiraId, metadata.projectId, metadata.featureId, metadata.assignedTo, metadata.createdBy, metadata.status];
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
            metadataId: metadataSavedId,
        }
    }
}

module.exports = Jira;