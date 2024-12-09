const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const ProjectService = require("../Service/ProjectService");
const {
    ProjectKeyGenerateRequest,
    ProjectCreateRequest,
    UpdateProjectDescriptionRequest,
    UpdateProjectLeadRequest, GetProjectByProjectKeyRequest, GetAllProjectsRequest
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

exports.getAllProjects = catchAsync(async (req, res) => {

    let validated = undefined

    try {
        validated = await GetAllProjectsRequest.validateAsync({
            search: req.query.search,
            page: req.query.page,
            pageSize: req.query.pageSize
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    validated.user = req.user;

    const {success, data, message} = await ProjectService.getAllProjects(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, data);
});

exports.getProjectByProjectKey = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetProjectByProjectKeyRequest.validateAsync({
            projectKey: req.params.projectKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await ProjectService.getProjectByProjectKey(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {project: data});
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
