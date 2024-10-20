/**
 * @swagger
 * components:
 *   schemas:
 *     JiraCreate:
 *       required:
 *         - summary
 *         - jiraType
 *         - description
 *         - jiraPoint
 *         - projectKey
 *         - featureKey
 *         - assignedTo
 *         - createdBy
 *       type: object
 *       properties:
 *         summary:
 *           type: string
 *           description: The summary / title for jira
 *         jiraType:
 *           type: string
 *           description: The jira type, can be a bug or userStory
 *         description:
 *           type: string
 *           description: The description for the jira
 *         jiraPoint:
 *           type: number
 *           description: The point assigned for this jira
 *         projectKey:
 *           type: string
 *           description: The project key this jira linked to
 *         featureKey:
 *           type: string
 *           description: The feature key this jira linked to
 *         assignedTo:
 *           type: string
 *           description: The user this jira is assigned to
 *     JiraCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             jiraKey:
 *               type: string
 *               description: The jira key of the jira created
 *     GetJiraDetailsByJiraKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             jiraDetails:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                   description: The summary / title for jira
 *                 jiraKey:
 *                   type: string
 *                   description: The unique key to identify jira
 *                 jiraType:
 *                   type: string
 *                   description: The jira type, can be a bug or userStory
 *                 description:
 *                   type: string
 *                   description: The description for the jira
 *                 jiraLink:
 *                   type: string
 *                   description: The link for the jira
 *     GetJiraMetadataByJiraKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             jiraMetadata:
 *               type: object
 *               properties:
 *                 jiraKey:
 *                   type: string
 *                   description: The unique key to identify jira
 *                 jiraPoint:
 *                   type: number
 *                   description: The point assigned to jira
 *                 userAssignedToName:
 *                   type: string
 *                   description: The user name of user this jira is assigned to
 *                 userAssignedToEmail:
 *                   type: string
 *                   description: The user email of user this jira is assigned to
 *                 userAssignedToProfileImage:
 *                   type: string
 *                   description: The profile image of user this jira is assigned to
 *                 userCreatedByName:
 *                   type: string
 *                   description: The user name of user created this jira
 *                 userCreatedByEmail:
 *                   type: string
 *                   description: The user email of user created this jira
 *                 userCreatedByProfileImage:
 *                   type: string
 *                   description: The profile image of user this jira is created by
 *                 projectKey:
 *                   type: string
 *                   description: The project key this jira is linked to
 *                 projectName:
 *                   type: string
 *                   description: The project name this jira is linked to
 *                 featureKey:
 *                   type: string
 *                   description: The feature key this jira is linked to
 *                 featureName:
 *                   type: string
 *                   description: The feature name this jira is linked to
 *                 statusType:
 *                   type: string
 *                   description: The status description type this jira is in
 *                 createdOn:
 *                   type: string
 *                   description: The data and time this jira is created on
 *     UpdateDescription:
 *       required:
 *         - jiraKey
 *         - description
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         description:
 *           type: string
 *           description: The description for the jira
 *     UpdateDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *     UpdateAssignedTo:
 *       required:
 *         - jiraKey
 *         - assignedTo
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         assignedTo:
 *           type: string
 *           description: The updated user email
 *     UpdateAssignedToSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *     UpdatePoints:
 *       required:
 *         - jiraKey
 *         - jiraPoint
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         jiraPoint:
 *           type: number
 *           description: The updated jira point
 *     UpdatePointsSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *     UpdateFeature:
 *       required:
 *         - jiraKey
 *         - projectKey
 *         - featureKey
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         projectKey:
 *           type: string
 *           description: The project key this jira is linked to
 *         featureKey:
 *           type: string
 *           description: The updated feature key this jira is linked to
 *     UpdateFeatureSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 */