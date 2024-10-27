const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Project = require("../models/Project");
const {cleanProjectName} = require("../utils/utils");

exports.generateProjectKey = catchAsync(async (req, res, next) => {
    const {name} = req.body;
    const processedName = cleanProjectName(name);
    const projectKey = await Project.generateProjectKeySequence(processedName);
    const finalKey = processedName + (projectKey + 1);

    Response.ok201(res, {projectKey: finalKey});
});

exports.createProject = catchAsync(async (req, res, next) => {
    const {name, description, projectLeadBy, startDate, expectedEndDate} = req.body;

    // generate project key
    const processedName = cleanProjectName(name);
    const projectKeySequence = await Project.generateProjectKeySequence(processedName);
    const generatedProjectKey = processedName + (projectKeySequence + 1);

    // create the user object
    const newProject = Project.create()
        .setName(name)
        .setProjectKey(generatedProjectKey)
        .setDescription(description)
        .setLead(projectLeadBy)
        .setStartDate(startDate)
        .setExpectedEndDate(expectedEndDate)
        .build();

    await newProject.save();

    Response.ok201(res, {projectKey: generatedProjectKey});
});

exports.getAllProjectsAsOptions = catchAsync(async (req, res, next) => {
    const projects = await Project.getAllProjectsAsOptions();
    Response.ok200(res, {projects: projects});
});

exports.getProjectByProjectKey = catchAsync(async (req, res, next) => {
    const {projectKey} = req.params;
    const project = await Project.getProjectByProjectKey(projectKey);

    if (!project) {
        return Response.notFound404(res, {message: `No project found with key: ${projectKey}`});
    }

    Response.ok200(res, {project: project});
});