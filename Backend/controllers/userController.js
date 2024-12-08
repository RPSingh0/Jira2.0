const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const UserService = require("../Service/UserService");
const {UserCreateRequest} = require("../validator/UserRequestValidator");

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

// exports.workedOn = catchAsync(async (req, res) => {
//     // get the query from request
//     const query = req.query;
//     let response = null;
//
//     // if type is available
//     if (!query.type) {
//         response = await Jira.getJiraByUserEmail(req.user.email);
//     } else {
//         response = await Jira.getJiraByUserEmail(req.user.email, query.type);
//     }
//
//     if (!response || response.length === 0) {
//         return Response.notFound404(res, {message: `No data for user or type is invalid`});
//     }
//
//     Response.ok200(res, {jira: response});
// });