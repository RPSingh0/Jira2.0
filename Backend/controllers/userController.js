const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const Response = require('../utils/response');

exports.createUser = catchAsync(async (req, res, next) => {
    const {firstName, lastName, email, status, password} = req.body;

    // create the user object
    const newUser = User.create()
        .setFirstName(firstName)
        .setLastName(lastName)
        .setEmail(email)
        .setStatus(status)
        .setPassword(password)
        .build();

    const id = await newUser.save();

    Response.ok200(res, {id: id});
})