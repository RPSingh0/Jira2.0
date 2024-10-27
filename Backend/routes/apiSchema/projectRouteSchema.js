/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreate:
 *       required:
 *         - name
 *         - description
 *         - projectLeadBy
 *         - startDate
 *         - expectedEndDate
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project
 *         description:
 *           type: string
 *           description: The description of the project
 *         projectLeadBy:
 *           type: string
 *           description: The user leading / managing the project
 *         startDate:
 *           type: string
 *           description: The start date for project
 *           example: "dd/mm/yyyy"
 *         expectedEndDate:
 *           type: string
 *           description: The expected end date for project
 *           example: "dd/mm/yyyy"
 *     GenerateProjectKey:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project
 *     GenerateProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             projectKey:
 *               type: string
 *               description: The new project key
 *     ProjectCreateSuccess:
 *       type: object
 *       properties:
 *       status:
 *         type: string
 *         description: The status for this request
 *       data:
 *         type: object
 *         properties:
 *           projectKey:
 *             type: string
 *             description: The project key of the project created
 *     GetAllProjectsAsOptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             projects:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   projectKey:
 *                     type: string
 *                     description: The project key for the project
 *                   optionText:
 *                     type: string
 *                     description: The option text to show for frontend
 *     GetProjectByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             project:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the feature
 *                   projectKey:
 *                     type: string
 *                     description: The project key for project this feature is under
 *                   description:
 *                     type: string
 *                     description: The description about the feature
 *                   leadEmail:
 *                     type: string
 *                     description: The email of user leading the  project
 *                   leadName:
 *                     type: string
 *                     description: The name of user leading the project
 *                   startDate:
 *                     type: string
 *                     description: The start date of this project
 *                   expectedEndDate:
 *                     type: string
 *                     description: The end date of this project
 *                   daysSpent:
 *                     type: number
 *                     description: The number of days spent till now in this project
 */