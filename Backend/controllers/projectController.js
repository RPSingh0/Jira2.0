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

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const email = req.user.email
    const projects = await Project.getAllProjects(email);

    // processing team name, email and profileImage
    const response = projects.map(project => {
        const team = project.team;

        if (!team) {
            return {
                ...project,
                team: []
            }
        }

        const users = team.split('|+|');
        const finalUsers = users.map(user => {
            const userData = user.split('||');
            return {
                name: userData[0],
                email: userData[1],
                profileImage: userData[2],
            }
        });

        return {
            ...project,
            team: finalUsers
        }
    })

    Response.ok200(res, {projects: response});
});

exports.getProjectByProjectKey = catchAsync(async (req, res, next) => {
    const {projectKey} = req.params;
    const project = await Project.getProjectByProjectKey(projectKey);

    if (!project) {
        return Response.notFound404(res, {message: `No project found with key: ${projectKey}`});
    }

    Response.ok200(res, {project: project});
});

exports.updateDescription = catchAsync(async (req, res, next) => {
    const {projectKey, description} = req.body;

    const affectedRows = await Project.updateProjectDescription(projectKey, description);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such project found by key: ${projectKey}`,
        });
    }

    Response.ok200(res);
});

exports.updateLeadBy = catchAsync(async (req, res, next) => {
    const {projectKey, leadBy} = req.body;

    const affectedRows = await Project.updateLeadBy(projectKey, leadBy);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such project by key: ${projectKey}`
        });
    }

    Response.ok200(res);
});
