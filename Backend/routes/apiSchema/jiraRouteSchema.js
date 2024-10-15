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
 */