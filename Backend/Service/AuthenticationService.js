const UserService = require("./UserService");
const ErrorInterceptor = require("../utils/errorInterceptor");
const ErrorType = require("../utils/errorTypes");
const bcrypt = require("bcryptjs");
const tokenUtils = require('../utils/tokenUtils');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");

class AuthenticationService {

    static async loginUser(data) {

        const {success, data: user} = await UserService.findByEmailActive(data.email);

        if (!success) {
            throw new ErrorInterceptor({
                type: ErrorType.NOT_FOUND,
                message: 'Resource not allowed for user: Invalid/Inactive'
            });
        }

        // check for correct password
        const isPasswordCorrect = await AuthenticationService.comparePassword(data.password, user.password);

        if (!isPasswordCorrect) {
            throw new ErrorInterceptor({
                type: ErrorType.UNAUTHORIZED,
                message: 'Incorrect email or password'
            });
        }

        const token = tokenUtils.signedToken(data.email);

        return {success: true, data: token};
    }

    static async authenticateRequest(req) {

        let token;
        // check for bearer token in auth header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // take out the token
            token = req.headers.authorization.split(' ')[1];
        }

        // if there is no token, return unauthorized error
        if (!token) {
            throw new ErrorInterceptor({
                type: ErrorType.UNAUTHORIZED,
                message: 'Invalid or missing token'
            });
        }

        // validate token
        let decoded = null;

        try {
            decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
        } catch (error) {
            throw new ErrorInterceptor({
                type: ErrorType.UNAUTHORIZED,
                message: 'Invalid token'
            });
        }

        // check if user exists
        const {success, data: user, message} = await UserService.findByEmailActive(decoded.email);

        if (!success) {
            throw new ErrorInterceptor({
                type: ErrorType.FORBIDDEN,
                message: 'Resource not allowed for user: Invalid/Inactive'
            });
        }

        // check if user changed password after token is issued
        if (AuthenticationService.passwordChangedAfterTokenIssued(user.passwordChangedAt, decoded.iat)) {
            throw new ErrorInterceptor({
                type: ErrorType.UNAUTHORIZED,
                message: 'Password changed recently, please re-login'
            });
        }

        // #IMPORTANT Adding this user to request object, and it will be carried forward in next middleware
        req.user = user;
    }

    static async comparePassword(candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }

    static passwordChangedAfterTokenIssued(passwordChangedAt, tokenIssuedAt) {
        if (passwordChangedAt) {
            const changedTimestamp = parseInt(new Date(passwordChangedAt).getTime() / 1000, 10);
            return tokenIssuedAt < changedTimestamp;
        }

        return false;
    }
}

module.exports = AuthenticationService;