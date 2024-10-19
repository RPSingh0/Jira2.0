const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const {dbPromise} = require("../db");
const User = require("./User");

class Metadata {
    constructor(jiraKey, projectKey, featureKey, assignedTo, createdBy, status, jiraPoint) {
        this.jiraKey = jiraKey;
        this.projectKey = projectKey;
        this.featureKey = featureKey;
        this.assignedTo = assignedTo;
        this.createdBy = createdBy;
        this.status = status;
        this.jiraPoint = jiraPoint;
    }

    /**
     * A static method to build Metadata using the builder pattern
     *
     * @returns {Metadata} A new instance of Metadata class
     */
    static create() {
        return new Metadata();
    }

    /**
     * Metadata project key setter, validates for null values
     *
     * @param {string} projectKey
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setProjectKey(projectKey) {
        if (!projectKey) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project key is required.'
            })
        }

        this.projectKey = projectKey;
        return this;
    }

    /**
     * Metadata feature key setter, validates for null values
     *
     * @param {string} featureKey
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setFeatureKey(featureKey) {
        if (!featureKey) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Feature key is required.'
            })
        }

        this.featureKey = featureKey;
        return this;
    }

    /**
     * Metadata jira key setter, validates for null values
     *
     * @param {string} jiraKey
     *
     * @returns {Metadata}
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
     * Metadata assignedTo setter, validates for null values
     *
     * @param {number} assignedTo
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setAssignedTo(assignedTo) {
        if (!assignedTo) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Assigned to id is required.'
            })
        }

        this.assignedTo = assignedTo;
        return this;
    }

    /**
     * Metadata createdBy setter, validates for null values
     *
     * @param {number} createdBy
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setCreatedBy(createdBy) {
        if (!createdBy) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Created by id is required.'
            })
        }

        this.createdBy = createdBy;
        return this;
    }

    /**
     * Metadata status setter, validates for null values
     *
     * @param {number} status
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setStatus(status) {
        if (!status) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Status is required.'
            })
        }

        this.status = status;
        return this;
    }

    /**
     * Metadata jira point setter, validates for null values
     *
     * @param {number} jiraPoint
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setJiraPoint(jiraPoint) {
        if (!jiraPoint) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'jiraPoint is required.'
            })
        }

        this.jiraPoint = jiraPoint;
        return this;
    }

    /**
     * Validates all required fields are present, finalize and returns the Metadata object
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['jiraKey', 'jiraPoint', 'projectKey', 'featureKey', 'assignedTo', 'createdBy', 'status'];

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
     * Takes in a jira key as input and returns the jira details using jiraKey
     *
     * @param jiraKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async getJiraMetadataByJiraKey(jiraKey) {

        const query = `
            SELECT M.jira_key                                             AS jiraKey,
                   M.jira_point                                           AS jiraPoint,
                   CONCAT(UAT.first_name, ' ', IFNULL(UAT.last_name, '')) AS userAssignedToName,
                   UAT.email                                              AS userAssignedToEmail,
                   CONCAT(UCB.first_name, ' ', IFNULL(UCB.last_name, '')) AS userCreatedByName,
                   UCB.email                                              AS userCreatedByEmail,
                   P.project_key                                          AS projectKey,
                   P.name                                                 AS projectName,
                   F.feature_key                                          AS featureKey,
                   F.name                                                 AS featureName,
                   S.type                                                 AS statusType,
                   M.created_on                                           AS createdOn
            FROM Metadata AS M
                     INNER JOIN User AS UAT ON M.assigned_to = UAT.email
                     INNER JOIN User AS UCB ON M.created_by = UCB.email
                     INNER JOIN Project AS P ON M.project_key = P.project_key
                     INNER JOIN Feature AS F ON M.feature_key = F.feature_key
                     INNER JOIN Status AS S ON M.status = S.id
            WHERE M.jira_key = ?`

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
     * Takes in a jiraKey and assigned to email as input and updates jira metadata
     *
     * @param jiraKey
     * @param assignedTo
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateAssignedTo(jiraKey, assignedTo) {

        // check for user existence
        const user = await User.findByEmail(assignedTo);

        if (!user) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (assigned to)'
            });
        }

        const query = 'UPDATE Metadata SET assigned_to = ? WHERE jira_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [assignedTo, jiraKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating metadata: ${err.message}`,
            })
        }
    }
}

module.exports = Metadata;