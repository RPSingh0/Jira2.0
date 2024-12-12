const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const CommentService = require('../Service/CommentService');
const {CreateProjectCommentRequest, GetProjectCommentRequest, CreateFeatureCommentRequest, GetFeatureCommentRequest} = require("../validator/CommentRequestValidator");

exports.createProjectComment = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await CreateProjectCommentRequest.validateAsync({
            projectKey: req.body.projectKey,
            content: req.body.content
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    validated.user = req.user;

    const {success, message} = await CommentService.createProjectComment(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok201(res);
});

exports.getProjectComment = catchAsync(async (req, res) => {
    let validated = undefined;

    try {
        validated = await GetProjectCommentRequest.validateAsync({
            projectKey: req.params.projectKey
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await CommentService.getProjectComments(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok200(res, {comments: data});
});

exports.createFeatureComment = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await CreateFeatureCommentRequest.validateAsync({
            projectKey: req.body.projectKey,
            featureKey: req.body.featureKey,
            content: req.body.content
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    validated.user = req.user;

    const {success, message} = await CommentService.createFeatureComment(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok201(res);
});

exports.getFeatureComment = catchAsync(async (req, res) => {
    let validated = undefined;

    try {
        validated = await GetFeatureCommentRequest.validateAsync({
            projectKey: req.params.projectKey,
            featureKey: req.params.featureKey
        });

    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await CommentService.getFeatureComments(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok200(res, {comments: data});
});