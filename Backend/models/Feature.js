const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const Project = require("./Project");

class Feature {
    constructor(name, featureKey, description, projectKey) {
        this.name = name;
        this.featureKey = featureKey;
        this.description = description;
        this.projectKey = projectKey;
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
     * Project key setter
     *
     * @param {string} projectKey
     *
     * @returns {Feature}
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
     * Validates all required fields are present, finalize and returns the Feature object
     *
     * @returns {Feature}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['name', 'featureKey', 'description', 'projectKey'];

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

        // check for project existence
        const project = await Project.findByProjectKey(this.projectKey);

        if (!project) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such project available'
            });
        }

        const query = 'INSERT INTO Feature (name, feature_key, description, project_key) VALUES (?, ?, ?, ?)';
        const values = [this.name, this.featureKey, this.description, this.projectKey];

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
     * Takes in a project key as input, checks against the db for next feature key sequence
     *
     * @param projectKey
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async generateFeatureKeySequence(projectKey) {
        const query = 'SELECT COUNT(*) as count FROM Feature WHERE project_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [projectKey]);
            return results[0].count;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns features from database by project key
     *
     * @param projectKey
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async getFeaturesAsOptionsByProjectKey(projectKey) {
        const query = `
            SELECT feature_key                      AS featureKey,
                   CONCAT(feature_key, ' | ', name) AS optionText
            FROM Feature AS F
            WHERE project_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [projectKey]);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching features: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns features from database by project key and feature key
     *
     * @param projectKey
     * @param featureKey
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findFeatureByProjectKeyAndFeatureKey(projectKey, featureKey) {
        const query = `
            SELECT name,
                   feature_key AS featureKey,
                   project_key AS projectKey,
                   description
            FROM Feature
            WHERE project_key = ?
              AND feature_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [projectKey, featureKey]);
            return results[0];
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching features: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns features from database by project key
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findFeatureByProjectKey(projectKey, skip, limit, search) {
        const query = `
            WITH TotalCount AS (SELECT COUNT(project_key) as totalRecords
                                FROM Feature
                                WHERE project_key = ?
                                  AND (feature_key LIKE ? OR name LIKE ?))

            SELECT name,
                   feature_key             AS featureKey,
                   project_key             AS projectKey,
                   description,
                   TC.totalRecords AS totalRecords
            FROM Feature,
            TotalCount AS TC
            WHERE project_key = ?
              AND (feature_key LIKE ? OR name LIKE ?)
            LIMIT ? OFFSET ?`;

        try {
            const [results] = await dbPromise.execute(query, [projectKey, `%${search}%`, `%${search}%`, projectKey, `%${search}%`, `%${search}%`, `${limit}`, `${skip}`]);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching features: ${err.message}`,
            })
        }
    }

    /**
     * Takes in projectKey, feature key and updates description for a feature
     *
     * @param projectKey
     * @param featureKey
     * @param description
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateFeatureDescription(projectKey, featureKey, description) {

        const query = `
            UPDATE
                Feature
            SET description = ?
            WHERE project_key = ?
              AND feature_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [description, projectKey, featureKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating feature description: ${err.message}`,
            })
        }
    }

    /**
     * Takes in project key, feature key and updates a feature name
     *
     * @param projectKey
     * @param featureKey
     * @param name
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateFeatureName(projectKey, featureKey, name) {

        const query = `
            UPDATE
                Feature
            SET name = ?
            WHERE project_key = ?
              AND feature_key = ?`;

        try {
            const [results] = await dbPromise.execute(query, [name, projectKey, featureKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating feature summary: ${err.message}`,
            })
        }
    }
}

module.exports = Feature;