const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Jira = require("../models/Jira");
const Metadata = require("../models/Metadata");

exports.createJira = catchAsync(async (req, res, next) => {
    const {summary, jiraType, description, jiraPoint, projectId, featureId, assignedTo} = req.body;

    // create the jira
    const jira = Jira.create()
        .setSummary(summary)
        .setJiraType(jiraType)
        .setDescription(description)
        .build();

    // create partial metadata
    const partialMetadata = Metadata.create()
        .setProjectId(projectId)
        .setFeatureId(featureId)
        .setAssignedTo(assignedTo)
        .setCreatedBy(req.user.id)
        .setStatus(1)
        .setJiraPoint(jiraPoint)
        .partialBuild();

    const result = await jira.save(partialMetadata);

    Response.ok201(res, {jiraKey: result.jiraKey});
});

exports.getJiraDetailsByJiraKey = catchAsync(async (req, res, next) => {
    const jiraKey = req.params.jiraKey;

    const jiraDetails = await Jira.getJiraDetailsByJiraKey(jiraKey);

    Response.ok200(res, {jiraDetails: jiraDetails});
});

exports.updateJiraDescription = catchAsync(async (req, res, next) => {
    const {jiraKey, description} = req.body;

    const affectedRows = await Jira.updateJiraDescriptionByJiraKey(jiraKey, description);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: `No such jira by key: ${jiraKey}`
        });
    }

    Response.ok200(res, {affectedRows: affectedRows});
});

exports.updateJiraAssignedTo = catchAsync(async (req, res, next) => {
    const {jiraKey, assignedTo} = req.body;

    const affectedRows = await Metadata.updateAssignedTo(jiraKey, assignedTo);

    if (affectedRows === 0) {
        return Response.notFound404(res, {
            message: 'No such jira or user'
        });
    }

    Response.ok200(res, {affectedRows: affectedRows});
});