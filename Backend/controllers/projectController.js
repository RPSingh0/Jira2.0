const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Project = require("../models/Project");
const {cleanProjectName} = require("../utils/utils");

exports.getProjectKey = catchAsync(async (req, res, next) => {
    const {name} = req.body;
    const processedName = cleanProjectName(name);

    const projectKey = await Project.generateProjectKey(processedName);
    const finalKey = processedName + (projectKey + 1);

    Response.ok201(res, {projectKey: finalKey});
});

exports.createProject = catchAsync(async (req, res, next) => {
    const {name, projectKey, description, projectLeadBy, startDate, expectedEndDate} = req.body;

    // create the user object
    const newProject = Project.create()
        .setName(name)
        .setProjectKey(projectKey)
        .setDescription(description)
        .setLead(projectLeadBy)
        .setStartDate(startDate)
        .setExpectedEndDate(expectedEndDate)
        .build();

    const id = await newProject.save();

    Response.ok201(res, {id: id});
});