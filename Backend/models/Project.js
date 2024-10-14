const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const User = require("./User");
const {validateDateFormat} = require("../utils/utils");

class Project {
    constructor(name, projectKey, description, project_lead_by, start_date, expected_end_date) {
        this.name = name;
        this.projectKey = projectKey;
        this.description = description;
        this.project_lead_by = project_lead_by;
        this.start_date = start_date;
        this.expected_end_date = expected_end_date;
    }

    /**
     * A static method to build project using the builder pattern
     *
     * @returns {Project} A new instance of Project class
     */
    static create() {
        return new Project();
    }

    /**
     * Project name setter, validates for null values
     *
     * @param {string} name
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setName(name) {
        if (!name) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project name is required.'
            })
        }

        this.name = name;
        return this;
    }

    /**
     * Project key setter, validates for null values
     *
     * @param {string} projectKey
     *
     * @returns {Project}
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
     * Project description setter, validates for null values
     *
     * @param {string} description
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setDescription(description) {
        if (!description) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project description is required.'
            })
        }

        this.description = description;
        return this;
    }

    /**
     * Project lead setter, validates lead to be active only
     *
     * @param {number} lead
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setLead(lead) {

        if (!lead) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project lead is required.'
            })
        }

        this.project_lead_by = lead;
        return this;
    }

    /**
     * Project start date setter, validates for null values
     *
     * @param {string} startDate
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setStartDate(startDate) {
        if (!startDate) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project start date is required.'
            });
        }

        if (!validateDateFormat(startDate)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Please enter date in format: dd/mm/yyyy'
            });
        }

        const [day, month, year] = startDate.split('/');

        const dateObj = new Date(`${year}-${month}-${day}`);

        this.start_date = dateObj.toISOString().split('T')[0];

        return this;
    }

    /**
     * Project expected end date setter, validates for null values
     *
     * @param {string} expectedEndDate
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setExpectedEndDate(expectedEndDate) {
        if (!expectedEndDate) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Project expected end date is required.'
            });
        }

        if (!validateDateFormat(expectedEndDate)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Please enter date in format: dd/mm/yyyy'
            });
        }

        const [day, month, year] = expectedEndDate.split('/');

        const dateObj = new Date(`${year}-${month}-${day}`);

        this.expected_end_date = dateObj.toISOString().split('T')[0];

        return this;
    }

    /**
     * Validates all required fields are present, finalize and returns the Project object
     *
     * @returns {Project}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['name', 'key', 'description', 'project_lead_by', 'start_date', 'expected_end_date'];

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

        if (new Date(this.start_date) > new Date(this.expected_end_date)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'End data cannot be less then start date'
            });
        }

        return this;
    }

    /**
     * Builds and saves the Project to database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database insert operation
     *
     * @throws {ErrorInterceptor} Throws error if any required fields are missing or if there is a database error
     */
    async save() {
        this.build();

        // check for project lead
        const projectLead = await User.findById(this.project_lead_by);

        if (!projectLead) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available'
            });
        }

        if (projectLead.status === 0) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Selected project lead is not active'
            });
        }

        const query = 'INSERT INTO Project (name, project_key, description, project_lead_by, start_date, expected_end_date) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [this.name, this.projectKey, this.description, this.project_lead_by, this.start_date, this.expected_end_date];

        try {
            const [{insertId: id}] = await dbPromise.execute(query, values);
            return id;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error saving Project: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a project name as input, checks against the db for next project key sequence
     *
     * @param name
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async generateProjectKey(name) {
        const query = 'SELECT COUNT(*) as count FROM Project WHERE project_key LIKE ?';

        try {
            const [results] = await dbPromise.execute(query, [`${name}%`]);
            return results[0].count;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error executing query: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns a single project from database by id
     *
     * @param id
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findById(id) {
        const query = 'SELECT id, name, project_key FROM project WHERE id = ?';

        try {
            const [results] = await dbPromise.execute(query, [id]);
            return results[0];
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching project: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns all projects from database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if there is a database error
     */
    static async getAllProjects() {
        const query = 'SELECT id, project_key as projectKey, CONCAT(project_key, \' | \', name) AS optionText FROM project';

        try {
            const [results] = await dbPromise.execute(query);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching projects: ${err.message}`,
            })
        }
    }
}

module.exports = Project;