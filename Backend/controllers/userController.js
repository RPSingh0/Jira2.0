const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

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

    res.end(JSON.stringify(id));
})