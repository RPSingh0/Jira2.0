const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Jira = require("../models/Jira");
const Metadata = require("../models/Metadata");

exports.createJira = catchAsync(async (req, res, next) => {
    const {summary, jiraType, description, jiraPoint, projectKey, featureKey, assignedTo} = req.body;

    // generate jira key
    const jiraKeySequence = await Jira.generateJiraKeySequence(projectKey);
    const generatedJiraKey = projectKey + '-' + (jiraKeySequence + 1);

    // create the jira
    const jira = Jira.create()
        .setSummary(summary)
        .setJiraKey(generatedJiraKey)
        .setJiraType(jiraType)
        .setDescription(description)
        .setJiraLink(`/project/${projectKey}/feature/${featureKey}/${generatedJiraKey}`)
        .build();

    // create metadata
    const metadata = Metadata.create()
        .setJiraKey(generatedJiraKey)
        .setJiraPoint(jiraPoint)
        .setProjectKey(projectKey)
        .setFeatureKey(featureKey)
        .setAssignedTo(assignedTo)
        .setCreatedBy(req.user.email)
        .setStatus(1)
        .build();

    const result = await jira.save(metadata);

    Response.ok201(res, {jiraKey: result.jiraKey});
});

exports.getJiraDetailsByJiraKey = catchAsync(async (req, res, next) => {
    const jiraKey = req.params.jiraKey;

    const jiraDetails = await Jira.getJiraDetailsByJiraKey(jiraKey);

    if (!jiraDetails) {
        return Response.notFound404(res, {
            message: `No jira found by key: ${jiraKey}`
        });
    }

    Response.ok200(res, {jiraDetails: jiraDetails});
});

exports.getJiraMetadataByJiraKey = catchAsync(async (req, res, next) => {
    const jiraKey = req.params.jiraKey;

    const jiraMetadata = await Metadata.getJiraMetadataByJiraKey(jiraKey);

    if (!jiraMetadata) {
        return Response.notFound404(res, {
            message: `No jira found by key: ${jiraKey}`
        });
    }

    Response.ok200(res, {jiraMetadata: jiraMetadata});
});

exports.updateSummary = catchAsync(async (req, res, next) => {
    const {jiraKey, summary} = req.body;

    const affectedRows = await Jira.updateJiraSummaryByJiraKey(jiraKey, summary);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such jira by key: ${jiraKey}`
        });
    }

    Response.ok200(res);
});

exports.updateDescription = catchAsync(async (req, res, next) => {
    const {jiraKey, description} = req.body;

    const affectedRows = await Jira.updateJiraDescriptionByJiraKey(jiraKey, description);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such jira by key: ${jiraKey}`
        });
    }

    Response.ok200(res);
});

exports.updateAssignedTo = catchAsync(async (req, res, next) => {
    const {jiraKey, assignedTo} = req.body;

    const affectedRows = await Metadata.updateAssignedTo(jiraKey, assignedTo);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such jira by key: ${jiraKey}`
        });
    }

    Response.ok200(res);
});

exports.updatePoints = catchAsync(async (req, res, next) => {
    const {jiraKey, jiraPoint} = req.body;

    const affectedRows = await Metadata.updatePoints(jiraKey, jiraPoint);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such jira by key: ${jiraKey}`
        });
    }

    Response.ok200(res);
});

exports.updateFeature = catchAsync(async (req, res, next) => {
    const {jiraKey, projectKey, featureKey} = req.body;

    await Metadata.updateFeature(jiraKey, projectKey, featureKey);

    Response.ok200(res);
});