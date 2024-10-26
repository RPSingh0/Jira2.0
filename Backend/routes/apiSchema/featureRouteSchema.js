/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureCreate:
 *       required:
 *         - name
 *         - description
 *         - projectKey
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the feature
 *         description:
 *           type: string
 *           description: The description of the feature
 *         projectKey:
 *           type: string
 *           description: The project this feature belongs to
 *     FeatureCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             featureKey:
 *               type: string
 *               description: The feature key of the feature created
 *     GetFeaturesAsOptionsByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             features:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   featureKey:
 *                     type: string
 *                     description: The feature key for the feature
 *                   optionText:
 *                     type: string
 *                     description: The option text to show for frontend
 *     GetFeatureByProjectKeyAndFeatureKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             feature:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the feature
 *                   featureKey:
 *                     type: string
 *                     description: The feature key for feature
 *                   projectKey:
 *                     type: string
 *                     description: The project key for project this feature is under
 *                   description:
 *                     type: string
 *                     description: The description about the feature
 *     GetJiraUnderFeatureSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
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
 *                     description: The summary of the jira
 *                   jiraType:
 *                     type: string
 *                     description: The type of jira
 *                   jiraKey:
 *                     type: string
 *                     description: The jira key of the jira
 *                   jiraLink:
 *                     type: string
 *                     description: The link to jira
 *                   userAssignedToName:
 *                     type: string
 *                     description: The user name of user this jira is assigned to
 *                   userAssignedToEmail:
 *                     type: string
 *                     description: The email of the user this jira is assigned to
 *                   statusType:
 *                     type: string
 *                     description: The status of this jira
 *     UpdateFeatureName:
 *       required:
 *         - projectKey
 *         - featureKey
 *         - name
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *           description: The project key this feature is under
 *         featureKey:
 *           type: string
 *           description: The feature key of the feature
 *         name:
 *           type: string
 *           description: The updated name of the feature
 *     UpdateFeatureNameSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *     UpdateFeatureDescription:
 *       required:
 *         - projectKey
 *         - featureKey
 *         - description
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *           description: The project key this feature is under
 *         featureKey:
 *           type: string
 *           description: The feature key of the feature
 *         description:
 *           type: string
 *           description: The updated description of the feature
 *     UpdateFeatureDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 */