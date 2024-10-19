/**
 * @swagger
 * components:
 *   schemas:
 *     JiraCreate:
 *       required:
 *         - summary
 *         - jiraKey
 *         - jiraType
 *         - description
 *         - projectId
 *         - featureId
 *         - assignedTo
 *         - createdBy
 *       type: object
 *       properties:
 *         summary:
 *           type: string
 *           description: The summary / title for jira
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         jiraType:
 *           type: string
 *           description: The jira type, can be a bug or userStory
 *         description:
 *           type: string
 *           description: The description for the jira
 *         projectId:
 *           type: number
 *           description: The project id this jira linked to
 *         featureId:
 *           type: number
 *           description: The feature id this jira linked to
 *         assignedTo:
 *           type: number
 *           description: The user this jira is assigned to
 *         createdBy:
 *           type: number
 *           description: The user created this jira
 *     JiraCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             jiraId:
 *               type: number
 *               description: The id of the jira created
 *     GetJiraDetailsByJiraKey:
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
 *                 description:
 *                   type: string
 *                   description: The description for the jira
 *                 jiraKey:
 *                   type: string
 *                   description: The unique key to identify jira
 *                 jiraType:
 *                   type: string
 *                   description: The jira type, can be a bug or userStory
 *                 jiraPoint:
 *                   type: number
 *                   description: The point assigned to jira
 *                 userAssignedToId:
 *                   type: number
 *                   description: The user id of user this jira is assigned to
 *                 userAssignedToName:
 *                   type: string
 *                   description: The user name of user this jira is assigned to
 *                 userAssignedToEmail:
 *                   type: string
 *                   description: The user email of user this jira is assigned to
 *                 userCreatedById:
 *                   type: number
 *                   description: The user id of user created this jira
 *                 userCreatedByName:
 *                   type: string
 *                   description: The user name of user created this jira
 *                 userCreatedByEmail:
 *                   type: string
 *                   description: The user email of user created this jira
 *                 projectId:
 *                   type: number
 *                   description: The project id this jira linked to
 *                 projectKey:
 *                   type: string
 *                   description: The project key this jira linked to
 *                 featureId:
 *                   type: number
 *                   description: The feature id this jira linked to
 *                 featureKey:
 *                   type: string
 *                   description: The feature key this jira linked to
 *                 statusId:
 *                   type: string
 *                   description: The status id this jira is in
 *                 statusType:
 *                   type: string
 *                   description: The status description type this jira is in
 *                 createdOn:
 *                   type: string
 *                   description: The data and time this jira is created on
 *     UpdateJiraDescription:
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
 *     UpdateJiraDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             affectedRows:
 *               type: number
 *               description: The number of rows affected by this operation
 *     UpdateJiraAssignedTo:
 *       required:
 *         - jiraKey
 *         - assignedTo
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *           description: The unique key to identify jira
 *         assignedTo:
 *           type: number
 *           description: The updated user id
 *     UpdateJiraAssignedToSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             affectedRows:
 *               type: number
 *               description: The number of rows affected by this operation
 */