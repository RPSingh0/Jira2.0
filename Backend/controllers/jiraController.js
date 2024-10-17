const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/response');
const Jira = require("../models/Jira");
const Metadata = require("../models/Metadata");

exports.createJira = catchAsync(async (req, res, next) => {
    const {summary, jiraType, description, projectId, featureId, assignedTo, createdBy} = req.body;

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
        .setCreatedBy(createdBy)
        .setStatus(1)
        .partialBuild();

    const result = await jira.save(partialMetadata);

    Response.ok201(res, {jiraId: result.jiraId});
});