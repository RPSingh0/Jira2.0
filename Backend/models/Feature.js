const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const Project = require("./Project");

class Feature {
    constructor(name, featureKey, description, project_id) {
        this.name = name;
        this.featureKey = featureKey;
        this.description = description;
        this.project_id = project_id;
    }

    /**
     * A static method to build feature using the builder pattern
     *
     * @returns {Feature} A new instance of Feature class
     */
    static create() {
        return new Feature();
    }

    /**
     * Feature name setter, validates for null values
     *
     * @param {string} name
     *
     * @returns {Feature}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setName(name) {
        if (!name) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Feature name is required.'
            })
        }

        this.name = name;
        return this;
    }

    /**
     * Feature key setter, validates for null values
     *
     * @param {string} featureKey
     *
     * @returns {Feature}
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
     * Feature description setter, validates for null values
     *
     * @param {string} description
     *
     * @returns {Feature}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setDescription(description) {
        if (!description) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Feature description is required.'
            })
        }

        this.description = description;
        return this;
    }

    /**
     * Project id setter
     *
     * @param {number} projectId
     *
     * @returns {Feature}
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

        this.project_id = projectId;
        return this;
    }

    /**
     * Validates all required fields are present, finalize and returns the Feature object
     *
     * @returns {Feature}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['name', 'featureKey', 'description', 'project_id'];

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
     * Builds and saves the Feature to database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database insert operation
     *
     * @throws {ErrorInterceptor} Throws error if any required fields are missing or if there is a database error
     */
    async save() {
        this.build();

        // check for project lead
        const project = await Project.findById(this.project_id);

        if (!project) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such project available'
            });
        }

        const query = 'INSERT INTO Feature (name, feature_key, description, project_id) VALUES (?, ?, ?, ?)';
        const values = [this.name, this.featureKey, this.description, this.project_id];

        try {
            const [{insertId: id}] = await dbPromise.execute(query, values);
            return id;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error saving Feature: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a project id as input, checks against the db for next feature key sequence
     *
     * @param projectId
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async generateFeatureKey(projectId) {
        const query = 'SELECT COUNT(*) as count FROM Feature WHERE project_id = ?';

        try {
            const [results] = await dbPromise.execute(query, [projectId]);
            return results[0].count;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }
}

module.exports = Feature;