const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Feature = require("../models/Feature");

exports.getFeatureKey = catchAsync(async (req, res, next) => {
    const {id} = req.body;

    const featureKey = await Feature.generateFeatureKey(id);
    const finalKey = 'FTR-' + (featureKey + 1);

    Response.ok201(res, {featureKey: finalKey});
});

exports.createFeature = catchAsync(async (req, res, next) => {
    const {name, featureKey, description, projectId} = req.body;

    // create the user object
    const newFeature = Feature.create()
        .setName(name)
        .setFeatureKey(featureKey)
        .setDescription(description)
        .setProjectId(projectId)
        .build();

    const id = await newFeature.save();

    Response.ok201(res, {id: id});
});