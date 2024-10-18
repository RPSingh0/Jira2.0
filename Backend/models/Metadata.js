const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');

class Metadata {
    constructor(jiraId, projectId, featureId, assignedTo, createdBy, status, jiraPoint) {
        this.jiraId = jiraId;
        this.projectId = projectId;
        this.featureId = featureId;
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
     * Metadata projectId setter, validates for null values
     *
     * @param {number} projectId
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setProjectId(projectId) {
        if (!projectId) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project id is required.'
            })
        }

        this.projectId = projectId;
        return this;
    }

    /**
     * Metadata featureId setter, validates for null values
     *
     * @param {number} featureId
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setFeatureId(featureId) {
        if (!featureId) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Feature id is required.'
            })
        }

        this.featureId = featureId;
        return this;
    }

    /**
     * Metadata jiraId setter, validates for null values
     *
     * @param {number} jiraId
     *
     * @returns {Metadata}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setJiraId(jiraId) {
        if (!jiraId) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Jira id is required.'
            })
        }

        this.jiraId = jiraId;
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
    partialBuild() {
        const requiredFields = ['projectId', 'featureId', 'assignedTo', 'createdBy', 'status', 'jiraPoint'];

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
}

module.exports = Metadata;