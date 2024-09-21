const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');

class User {
    constructor(firstName, lastName, email, status, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.status = status;
        this.password = password;
    }

    /**
     * A static method to build user using the builder pattern
     *
     * @returns {User} A new instance of User class
     */
    static create() {
        return new User();
    }

    /**
     * First name setter, validates for null values
     *
     * @param firstName
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setFirstName(firstName) {
        if (!firstName) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'First name is required.'
            })
        }

        this.firstName = firstName;
        return this;
    }

    /**
     * Last name setter, validates for null values
     *
     * @param lastName
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setLastName(lastName) {
        if (!lastName) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Last name is required.'
            })
        }

        this.lastName = lastName;
        return this;
    }

    /**
     * Email setter, validates email
     *
     * @param email
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Email is not valid.',
            });
        }

        this.email = email;
        return this;
    }

    /**
     * Status setter, validates status to be one of `active` or `inactive`
     *
     * @param status
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setStatus(status) {
        const validStatuses = ['active', 'inactive'];
        if (!validStatuses.includes(status)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: `Status must be one of: ${validStatuses.join(', ')}.`,
            });
        }
        this.status = status === 'active' ? 1 : 0;
        return this;
    }

    /**
     * Password setter, validate password against following rules
     * * At least 6 characters long
     * * Not more than 16 Characters long
     * * Have at least one of following `[*, @, #, $]`
     * * Have at least one digit
     *
     * @param password
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validation
     */
    setPassword(password) {
        if (password.length < 6 || password.length > 16) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Password must be between 6 and 16 characters long.'
            });
        }

        const specialCharRegex = /[*,@,#,$]/;
        if (!specialCharRegex.test(password)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Password must contain at least one of the following characters: *, @, #, $.'
            });
        }

        const digitRegex = /\d/;
        if (!digitRegex.test(password)) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Password must contain at least one digit.'
            });
        }

        this.password = password;
        return this;
    }

    /**
     * Validates all required fields are present, finalize and returns the User object
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validation if any required field is missing
     */
    build() {
        const requiredFields = ['firstName', 'email', 'status', 'password'];

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
     * Builds and saves the user to database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database insert operation
     *
     * @throws {ErrorInterceptor} Throws error if any required fields are missing or if there is a database error
     */
    async save() {
        this.build();
        const query = 'INSERT INTO user (first_name, last_name, email, status, password) VALUES (?, ?, ?, ?, ?)';
        const values = [this.firstName, this.lastName, this.email, this.status, this.password];

        try {
            const [{insertId: id}] = await dbPromise.execute(query, values);
            return id;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error saving user: ${err.message}`,
            })
        }
    }
}

module.exports = User;