const catchAsync = require('../utils/catchAsync');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const UserService = require("../Service/UserService");
const Response = require("../utils/response");
const tokenUtils = require('../utils/tokenUtils');
const jwt = require("jsonwebtoken");
const {promisify} = require('util');

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Incorrect email or password',
        });
    }

    // find user in database
    const {success, data: user, message} = await UserService.findByEmail(email);

    // if user does not exist
    if (!success) {
        throw new ErrorInterceptor({
            type: ErrorType.NOT_FOUND,
            message: message
        });
    }

    // if user is not active
    if (user.status === false) {
        throw new ErrorInterceptor({
            type: ErrorType.FORBIDDEN,
            message: 'Resource not allowed for user: Inactive'
        });
    }

    // check for correct password
    const isPasswordCorrect = await UserService.comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Incorrect email or password'
        });
    }

    const token = tokenUtils.signedToken(user.email);

    Response.ok200(res, {token: token});
});

exports.authenticate = catchAsync(async (req, res, next) => {
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
    const {success, data: user, message} = await UserService.findByEmail(decoded.email);

    // if there is no user
    if (!success) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Invalid token'
        });
    }

    // if user exists, check for if user is active
    if (user.status === false) {
        throw new ErrorInterceptor({
            type: ErrorType.FORBIDDEN,
            message: 'Resource not allowed for user: Inactive'
        });
    }

    // check if user changed password after token is issued
    if (UserService.passwordChangedAfterTokenIssued(user.passwordChangedAt, decoded.iat)) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Password changed recently, please re-login'
        });
    }

    // #IMPORTANT Adding this user to request object, and it will be carried forward in next middleware
    req.user = user;
    next();
});

exports.validateToken = catchAsync(async (req, res, next) => {
    Response.ok204(res);
});