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
        const requiredFields = ['name', 'description', 'project_lead_by', 'start_date', 'expected_end_date'];

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
        const projectLead = await User.findByEmail(this.project_lead_by);

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
    static async generateProjectKeySequence(name) {
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
     * Fetches and returns a single project from database by project key
     *
     * @param projectKey
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findByProjectKey(projectKey) {
        const query = 'SELECT id, name, project_key FROM project WHERE project_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [projectKey]);
            return results[0];
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching project: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns all projects as option from database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if there is a database error
     */
    static async getAllProjectsAsOptions() {
        const query = 'SELECT project_key as projectKey, CONCAT(project_key, \' | \', name) AS optionText FROM project';

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

    /**
     * Fetches and return a project using project key
     *
     * @param projectKey
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if there is a database error
     */
    static async getProjectByProjectKey(projectKey) {
        const query = `
            SELECT P.name,
                   P.project_key                                      AS projectKey,
                   P.description,
                   U.email                                            AS leadEmail,
                   CONCAT(U.first_name, ' ', IFNULL(U.last_name, '')) AS leadName,
                   U.profile_image                                    AS leadProfileImage,
                   P.start_date                                       AS startDate,
                   P.expected_end_date                                AS expectedEndDate,
                   DATEDIFF(P.expected_end_date, P.start_date)        AS daysSpent,
                   COUNT(CASE WHEN S.type = 'DONE' THEN 1 END)        AS doneIssues,
                   COUNT(CASE WHEN S.type != 'DONE' THEN 1 END)       AS openIssues,
                   ROUND(
                           IFNULL(
                                   (COUNT(CASE WHEN S.type = 'DONE' THEN 1 END) /
                                    NULLIF((COUNT(CASE WHEN S.type != 'DONE' THEN 1 END) +
                                            COUNT(CASE WHEN S.type = 'DONE' THEN 1 END)), 0)) * 100,
                                   0
                           )
                   )                                                  AS completionPercentage
            FROM project AS P
                     INNER JOIN
                 User AS U ON U.email = P.project_lead_by
                     LEFT JOIN
                 metadata AS M ON P.project_key = M.project_key
                     LEFT JOIN
                 status AS S ON S.id = M.status
            WHERE P.project_key = ?
            GROUP BY P.name, P.project_key, P.description, U.email, U.first_name, U.last_name, U.profile_image,
                     P.start_date, P.expected_end_date;`;

        try {
            const [results] = await dbPromise.execute(query, [projectKey]);
            return results[0]
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching project: ${err.message}`,
            })
        }
    }

    /**
     * Takes in projectKey, and updates description for a project
     *
     * @param projectKey
     * @param description
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateProjectDescription(projectKey, description) {

        const query = 'UPDATE Project SET description = ? WHERE project_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [description, projectKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating project description: ${err.message}`,
            })
        }
    }

    /**
     * Takes in a project key and an email and updates project's lead to that email
     *
     * @param projectKey
     * @param leadBy
     *
     * @returns {Promise<number>}
     *
     * @throws {ErrorInterceptor} Error if there is a database error
     */
    static async updateLeadBy(projectKey, leadBy) {

        // check for user existence
        const user = await User.findByEmail(leadBy);

        if (!user) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'No Such user available (lead by)'
            });
        }

        const query = 'UPDATE Project SET project_lead_by = ? WHERE project_key = ?';

        try {
            const [results] = await dbPromise.execute(query, [leadBy, projectKey]);
            return results.affectedRows;

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating project: ${err.message}`,
            })
        }
    }
}

module.exports = Project;