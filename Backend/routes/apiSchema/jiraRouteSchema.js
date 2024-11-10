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
 *         - assignee
 *         - reporter
 *       type: object
 *       properties:
 *         summary:
 *           type: string
 *         jiraType:
 *           type: string
 *         description:
 *           type: string
 *         jiraPoint:
 *           type: number
 *         projectKey:
 *           type: string
 *         featureKey:
 *           type: string
 *         assignee:
 *           type: string
 *     JiraCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             jiraKey:
 *               type: string
 *     GetJiraDetailsByJiraKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             jiraDetails:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                 jiraKey:
 *                   type: string
 *                 jiraType:
 *                   type: string
 *                 description:
 *                   type: string
 *                 jiraLink:
 *                   type: string
 *     GetJiraMetadataByJiraKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             jiraMetadata:
 *               type: object
 *               properties:
 *                 jiraKey:
 *                   type: string
 *                 jiraPoint:
 *                   type: number
 *                 assigneeName:
 *                   type: string
 *                 assigneeEmail:
 *                   type: string
 *                 assigneeProfileImage:
 *                   type: string
 *                 reporterName:
 *                   type: string
 *                 reporterEmail:
 *                   type: string
 *                 reporterProfileImage:
 *                   type: string
 *                 projectKey:
 *                   type: string
 *                 projectName:
 *                   type: string
 *                 featureKey:
 *                   type: string
 *                 featureName:
 *                   type: string
 *                 statusType:
 *                   type: string
 *                 createdOn:
 *                   type: string
 *     GetJiraUnderFeatureSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             jira:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   summary:
 *                     type: string
 *                   jiraType:
 *                     type: string
 *                   jiraKey:
 *                     type: string
 *                   jiraLink:
 *                     type: string
 *                   assigneeName:
 *                     type: string
 *                   assigneeEmail:
 *                     type: string
 *                   statusType:
 *                     type: string
 *     UpdateDescription:
 *       required:
 *         - jiraKey
 *         - description
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *         description:
 *           type: string
 *     UpdateDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdateSummary:
 *       required:
 *         - jiraKey
 *         - summary
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *         summary:
 *           type: string
 *     UpdateSummarySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdateAssignee:
 *       required:
 *         - jiraKey
 *         - assignee
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *         assignee:
 *           type: string
 *     UpdateAssigneeSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdatePoints:
 *       required:
 *         - jiraKey
 *         - jiraPoint
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *         jiraPoint:
 *           type: number
 *     UpdatePointsSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdateFeature:
 *       required:
 *         - jiraKey
 *         - projectKey
 *         - featureKey
 *       type: object
 *       properties:
 *         jiraKey:
 *           type: string
 *         projectKey:
 *           type: string
 *         featureKey:
 *           type: string
 *     UpdateFeatureSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */