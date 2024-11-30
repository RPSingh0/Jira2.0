const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Feature = require("../models/Feature");
const {validateAndGetSearchString, validateAndGetPage, validateAndGetPageSize} = require("../utils/utils");

exports.createFeature = catchAsync(async (req, res, next) => {
    const {name, description, projectKey} = req.body;

    // generate feature key
    const featureKeySequence = await Feature.generateFeatureKeySequence(projectKey);
    const generatedFeatureKey = 'ftr-' + (featureKeySequence + 1);

    // create the user object
    const newFeature = Feature.create()
        .setName(name)
        .setFeatureKey(generatedFeatureKey)
        .setDescription(description)
        .setProjectKey(projectKey)
        .build();

    await newFeature.save();

    Response.ok201(res, {featureKey: generatedFeatureKey});
});

exports.getFeatureByProjectKeyAndFeatureKey = catchAsync(async (req, res, next) => {
    const {projectKey, featureKey} = req.params;

    const feature = await Feature.findFeatureByProjectKeyAndFeatureKey(projectKey, featureKey);

    if (!feature) {
        return Response.notFound404(res, {message: `No feature with key: ${featureKey} within ${projectKey}`});
    }

    Response.ok200(res, {feature: feature});
});

exports.getFeatureByProjectKey = catchAsync(async (req, res, next) => {
    const {projectKey} = req.params;

    // take out query params
    let {search, page, pageSize} = req.query;

    search = validateAndGetSearchString(search);
    page = validateAndGetPage(parseInt(page));
    pageSize = validateAndGetPageSize(parseInt(pageSize));

    // calculate the offset
    const skip = (page - 1) * pageSize;

    const feature = await Feature.findFeatureByProjectKey(projectKey, skip, pageSize, search);

    if (!feature || feature.length === 0) {
        return Response.notFound404(res, {message: `No features found under project: ${projectKey}`});
    }

    Response.ok200(res, {feature: feature});
});

exports.getFeaturesAsOptionsByProjectKey = catchAsync(async (req, res, next) => {
    let {projectKey} = req.params;
    projectKey = projectKey.trim().toUpperCase();

    if (!projectKey) {
        Response.badRequest400(res, {message: 'No project key provided'});
    }

    const features = await Feature.getFeaturesAsOptionsByProjectKey(projectKey);

    Response.ok200(res, {features: features});
})

exports.updateName = catchAsync(async (req, res, next) => {
    const {projectKey, featureKey, name} = req.body;

    const affectedRows = await Feature.updateFeatureName(projectKey, featureKey, name);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such feature under project: ${projectKey} by feature: ${featureKey}`,
        });
    }

    Response.ok200(res);
});

exports.updateDescription = catchAsync(async (req, res, next) => {
    const {projectKey, featureKey, description} = req.body;

    const affectedRows = await Feature.updateFeatureDescription(projectKey, featureKey, description);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such feature under project: ${projectKey} by feature: ${featureKey}`
        });
    }

    Response.ok200(res);
});