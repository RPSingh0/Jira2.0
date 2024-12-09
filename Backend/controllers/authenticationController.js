const catchAsync = require('../utils/catchAsync');
const Response = require("../utils/response");
const {LoginRequest} = require("../validator/AuthenticationRequestValidator");
const AuthenticationService = require("../Service/AuthenticationService");

exports.login = catchAsync(async (req, res) => {

    let validated = undefined

    try {
        validated = await LoginRequest.validateAsync({
            email: req.body.email,
            password: req.body.password,
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {data} = await AuthenticationService.loginUser(validated);

    Response.ok200(res, {token: data});
});

exports.authenticate = catchAsync(async (req, res, next) => {
    await AuthenticationService.authenticateRequest(req);
    next();
});

exports.validateToken = catchAsync(async (req, res) => {
    Response.ok204(res);
});