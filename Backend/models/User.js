const {dbPromise} = require('../db');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const bcrypt = require('bcryptjs');

class User {
    constructor(firstName, lastName, email, profileImage, status, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profileImage = profileImage;
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
     * @param {string} firstName
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
     * @param {string} lastName
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
     * @param {string} email
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
     * Profile Image setter, validates for null values
     *
     * @param {string} profileImage
     *
     * @returns {User}
     *
     * @throws {ErrorInterceptor} Error for field validations
     */
    setProfileImage(profileImage) {
        if (!profileImage) {
            throw new ErrorInterceptor({
                type: ErrorType.VALIDATION,
                message: 'Profile image is required',
            });
        }

        this.profileImage = profileImage;
        return this;
    }

    /**
     * Status setter, validates status to be one of `active` or `inactive`
     *
     * @param {string} status
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
     * @param {string} password
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
     * Hashes the password and overwrites the input value for password
     *
     * @returns {Promise<void>}
     */
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
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
        await this.hashPassword();

        const query = 'INSERT INTO user (first_name, last_name, email, profile_image, status, password) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [this.firstName, this.lastName, this.email, this.profileImage, this.status, this.password];

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

    /**
     * Fetches and returns a single user from database by id
     *
     * @param id
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findById(id) {
        const query = 'SELECT id, email, password, status, password_changed_at FROM user WHERE id = ?';

        try {
            const [results] = await dbPromise.execute(query, [id]);
            return results[0];
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching user: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns a single user from database by email
     *
     * @param {string} email
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if id is missing or if there is a database error
     */
    static async findByEmail(email) {
        const query = 'SELECT id, email, password, status FROM user WHERE email = ?';

        try {
            const [results] = await dbPromise.execute(query, [email]);
            return results[0]
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching user: ${err.message}`,
            })
        }
    }

    /**
     * Fetches and returns all users from database
     *
     * @returns {Promise<Object>} A promise that resolves with the result of database select operation
     *
     * @throws {ErrorInterceptor} Throws error if there is a database error
     */
    static async getAllUsers() {
        const query = 'SELECT CONCAT(first_name, \' \', IFNULL(last_name, \'\')) AS name, profile_image AS profileImage, email FROM user WHERE status = 1;';

        try {
            const [results] = await dbPromise.execute(query);
            return results;
        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching users: ${err.message}`,
            })
        }
    }

    /**
     * Compares login password against the password stored in database
     *
     * @param {string} candidatePassword
     *
     * @param {string} userPassword
     *
     * @returns {Promise<*>} A promise that resolves with a boolean
     */
    static async comparePassword(candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }

    /**
     * Checks if user changed password after token is issued
     *
     * @param {string} passwordChangedAt
     *
     * @param {string} tokenIssuedAt
     *
     * @returns {Boolean} A boolean representing result
     */
    static passwordChangedAfterTokenIssued(passwordChangedAt, tokenIssuedAt) {
        if (passwordChangedAt) {
            const changedTimestamp = parseInt(new Date(passwordChangedAt).getTime() / 1000, 10);
            return tokenIssuedAt < changedTimestamp;
        }

        return false;
    }
}

module.exports = User;