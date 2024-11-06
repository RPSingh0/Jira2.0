const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const Jira = require('../models/Jira');
const Response = require('../utils/response');

exports.createUser = catchAsync(async (req, res, next) => {
    const {firstName, lastName, email, status, password} = req.body;

    // create the user object
    const newUser = User.create()
        .setFirstName(firstName)
        .setLastName(lastName)
        .setEmail(email)
        .setProfileImage(`https://avatar.iran.liara.run/public/boy?username=${firstName}`)
        .setStatus(status)
        .setPassword(password)
        .build();

    const id = await newUser.save();

    Response.ok201(res, {id: id});
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.getAllUsers();
    Response.ok200(res, {users: users});
});

exports.workedOn = catchAsync(async (req, res, next) => {
    // get the query from request
    const query = req.query;
    let response = null;

    // if type is available
    if (!query.type) {
        response = await Jira.getJiraByUserEmail(req.user.email);
    } else {
        response = await Jira.getJiraByUserEmail(req.user.email, query.type);
    }

    if (!response || response.length === 0) {
        return Response.notFound404(res, {message: `No data for user or type is invalid`});
    }

    Response.ok200(res, {jira: response});
});