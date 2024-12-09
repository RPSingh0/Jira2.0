const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const JiraService = require("../Service/JiraService");
const {
    JiraCreateRequest, GetJiraDetailsByJiraKeyRequest,
    GetJiraMetadataByJiraKeyRequest, GetJiraUnderFeatureRequest, UpdateJiraSummaryRequest, UpdateJiraDescriptionRequest,
    UpdateJiraAssigneeRequest, UpdateJiraPointsRequest, UpdateJiraFeatureRequest
} = require("../validator/JiraRequestValidator");

exports.createJira = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await JiraCreateRequest.validateAsync({
            summary: req.body.summary,
            jiraType: req.body.jiraType,
            description: req.body.description,
            jiraPoint: req.body.jiraPoint,
            projectKey: req.body.projectKey,
            featureKey: req.body.featureKey,
            assignee: req.body.assignee,
            reporter: req.user.email
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.createJira(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok201(res);
});

exports.getJiraDetailsByJiraKey = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetJiraDetailsByJiraKeyRequest.validateAsync({
            jiraKey: req.params.jiraKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await JiraService.getJiraDetailsByJiraKey(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {jiraDetails: data});
});

exports.getJiraMetadataByJiraKey = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetJiraMetadataByJiraKeyRequest.validateAsync({
            jiraKey: req.params.jiraKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await JiraService.getJiraMetadataByJiraKey(validated);

    if (!success) {
        return Response.notFound404(res, {
            message: message
        });
    }

    Response.ok200(res, {jiraMetadata: data});
});

exports.getJiraUnderFeature = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetJiraUnderFeatureRequest.validateAsync({
            projectKey: req.params.projectKey,
            featureKey: req.params.featureKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message, data} = await JiraService.getJiraByProjectKeyAndFeatureKey(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {jira: data});
});

exports.updateSummary = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateJiraSummaryRequest.validateAsync({
            jiraKey: req.body.jiraKey,
            summary: req.body.summary
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.updateJiraSummary(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res);
});

exports.updateDescription = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateJiraDescriptionRequest.validateAsync({
            jiraKey: req.body.jiraKey,
            description: req.body.description
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.updateJiraDescription(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res);
});

exports.updateAssignee = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateJiraAssigneeRequest.validateAsync({
            jiraKey: req.body.jiraKey,
            assignee: req.body.assignee
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.updateJiraAssignee(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res);
});

exports.updatePoints = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateJiraPointsRequest.validateAsync({
            jiraKey: req.body.jiraKey,
            jiraPoint: req.body.jiraPoint
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.updateJiraPoints(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res);
});

exports.updateFeature = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateJiraFeatureRequest.validateAsync({
            jiraKey: req.body.jiraKey,
            projectKey: req.body.projectKey,
            featureKey: req.body.featureKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await JiraService.updateJiraFeature(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res);
});