const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const {getPaginationParams} = require("../utils/utils");
const FeatureService = require("../Service/FeatureService");
const {
    FeatureCreateRequest,
    GetFeatureOptionsRequest,
    UpdateFeatureNameRequest,
    UpdateFeatureDescriptionRequest, GetFeatureByProjectKeyAndFeatureKey
} = require("../validator/FeatureRequestValidator");

exports.createFeature = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await FeatureCreateRequest.validateAsync({
            name: req.body.name,
            description: req.body.description,
            projectKey: req.body.projectKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await FeatureService.createFeature(validated);

    if (!success) {
        return Response.badRequest400(res, {message: message});
    }

    Response.ok201(res);
});

/* leave for now*/
exports.getFeatureByProjectKey = catchAsync(async (req, res) => {

    const {projectKey} = req.params;

    const {page, pageSize, search} = getPaginationParams(req.query);

    const {
        success,
        data: features,
        message
    } = await FeatureService.findFeatureByProjectKey(projectKey, page, pageSize, search);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, features);
});

exports.getFeatureByProjectKeyAndFeatureKey = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetFeatureByProjectKeyAndFeatureKey.validateAsync({
            projectKey: req.params.projectKey,
            featureKey: req.params.featureKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data, message} = await FeatureService.findFeatureByProjectKeyAndFeatureKey(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {feature: data});
});

exports.getFeatureOptions = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await GetFeatureOptionsRequest.validateAsync({
            projectKey: req.params.projectKey
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, data: features, message} = await FeatureService.getFeatureOptions(validated);

    if (!success) {
        return Response.notFound404(res, {message: message});
    }

    Response.ok200(res, {features: features});
})

exports.updateName = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateFeatureNameRequest.validateAsync({
            projectKey: req.body.projectKey,
            featureKey: req.body.featureKey,
            name: req.body.name
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await FeatureService.updateFeatureName(validated);

    if (!success) {
        return Response.notFound404(res, {message: message,});
    }

    Response.ok200(res);
});

exports.updateDescription = catchAsync(async (req, res) => {

    let validated = undefined;

    try {
        validated = await UpdateFeatureDescriptionRequest.validateAsync({
            projectKey: req.body.projectKey,
            featureKey: req.body.featureKey,
            description: req.body.description
        });
    } catch (err) {
        return Response.badRequest400(res, {message: err.message});
    }

    const {success, message} = await FeatureService.updateFeatureDescription(validated);

    if (!success) {
        return Response.notFound404(res, {message: message,});
    }

    Response.ok200(res);
});