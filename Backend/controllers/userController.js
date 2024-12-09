const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const UserService = require("../Service/UserService");
const JiraService = require("../Service/JiraService");
const {UserCreateRequest, GetWorkedOnJiraRequest} = require("../validator/UserRequestValidator");

exports.createUser = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UserCreateRequest.validateAsync({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.body.profileImage
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    await UserService.createUser(validated);

    Response.ok201(res);
});

exports.getAllActiveUsers = catchAsync(async (req, res) => {

    const {success, data: users, message} = await UserService.getAllActiveUsers();

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {users: users});
});

exports.workedOn = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetWorkedOnJiraRequest.validateAsync({
            type: req.query.type,
            page: req.query.page,
            pageSize: req.query.pageSize,
            search: req.query.search
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    validated.user = req.user;

    const {success, data, message} = await JiraService.getJiraByUserEmail(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {jira: data});
});