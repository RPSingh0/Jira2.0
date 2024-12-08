const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const {
    validateAndGetSearchString,
    validateAndGetPageSize,
    validateAndGetPage
} = require("../utils/utils");
const ProjectService = require("../Service/ProjectService");
const {
    ProjectKeyGenerateRequest,
    ProjectCreateRequest,
    UpdateProjectDescriptionRequest,
    UpdateProjectLeadRequest
} = require("../validator/ProjectRequestValidator");

exports.generateProjectKey = catchAsync(async (req, res) => {

    let validated = undefined

    try {

        validated = await ProjectKeyGenerateRequest.validateAsync({
            name: req.body.name
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {data: generatedKey} = await ProjectService.generateNextProjectKey(validated);

    Response.ok201(res, {projectKey: generatedKey});
});

exports.createProject = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await ProjectCreateRequest.validateAsync({
            name: req.body.name,
            description: req.body.description,
            projectLeadBy: req.body.projectLeadBy,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await ProjectService.createProject(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok201(res);
});

exports.getProjectOptions = catchAsync(async (req, res) => {

    const {success, data: projects, message} = await ProjectService.getProjectOptions();

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {projects: projects});
});

/* leave for now*/
exports.getAllProjects = catchAsync(async (req, res) => {

    // take out query params
    let {search, page, pageSize} = req.query;

    search = validateAndGetSearchString(search);
    page = validateAndGetPage(parseInt(page));
    pageSize = validateAndGetPageSize(parseInt(pageSize));

    // calculate the offset
    const skip = (page - 1) * pageSize;

    const email = req.user.email
    const projects = await Project.getAllProjects(email, skip, pageSize, search);
    let total = 0;

    // processing team name, email and profileImage
    const response = projects.map(project => {
        const team = project.team;
        total = project.totalRecords;

        if (!team) {
            return {
                ...project,
                totalRecords: undefined,
                completionPercentage: parseInt(project.completionPercentage),
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
            totalRecords: undefined,
            completionPercentage: parseInt(project.completionPercentage),
            team: finalUsers
        }
    })

    Response.ok200(res, {projects: response, total: total, page: page, pageSize: pageSize});
});

/* leave for now*/
exports.getProjectByProjectKey = catchAsync(async (req, res) => {
    const {projectKey} = req.params;
    const project = await Project.getProjectByProjectKey(projectKey);

    if (!project) {
        return Response.notFound404(res, {message: `No project found with key: ${projectKey}`});
    }

    Response.ok200(res, {project: project});
});

exports.updateDescription = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateProjectDescriptionRequest.validateAsync({
            projectKey: req.body.projectKey,
            description: req.body.description
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await ProjectService.updateProjectDescription(validated);

    if (!success) {
        return Response.notFound404(res, {
            message: message,
        });
    }

    Response.ok200(res);
});

exports.updateLead = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateProjectLeadRequest.validateAsync({
            projectKey: req.body.projectKey,
            projectLeadBy: req.body.projectLeadBy
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await ProjectService.updateProjectLead(validated);

    if (!success) {
        return Response.notFound404(res, {
            message: message,
        });
    }

    Response.ok200(res);
});
