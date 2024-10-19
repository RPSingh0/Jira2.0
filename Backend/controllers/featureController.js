const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Feature = require("../models/Feature");

exports.createFeature = catchAsync(async (req, res, next) => {
    const {name, description, projectKey} = req.body;

    // generate feature key
    const featureKeySequence = await Feature.generateFeatureKeySequence(projectKey);
    const generatedFeatureKey = 'FTR-' + (featureKeySequence + 1);

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

exports.getFeaturesAsOptionsByProjectKey = catchAsync(async (req, res, next) => {
    let {projectKey} = req.params;
    projectKey = projectKey.trim().toUpperCase();

    if (!projectKey) {
        Response.badRequest400(res, {message: 'No project key provided'});
    }

    const features = await Feature.getFeaturesAsOptionsByProjectKey(projectKey);

    Response.ok200(res, {features: features});
})