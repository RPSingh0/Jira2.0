const catchAsync = require('../utils/catchAsync');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const User = require('../models/user');
const Response = require("../utils/response");
const tokenUtils = require('../utils/tokenUtils');

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Incorrect email or password',
        });
    }

    // find user in database
    const user = await User.findByEmail(email);

    if (!user) {
        throw new ErrorInterceptor({
            type: ErrorType.NOT_FOUND,
            message: 'No user found'
        });
    }

    // check for correct password
    const isPasswordCorrect = await User.comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        throw new ErrorInterceptor({
            type: ErrorType.UNAUTHORIZED,
            message: 'Incorrect email or password'
        });
    }

    const token = tokenUtils.signedToken(user.id);

    Response.ok200(res, {token: token});
});