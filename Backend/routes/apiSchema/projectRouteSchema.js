/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreate:
 *       required:
 *         - name
 *         - projectKey
 *         - description
 *         - projectLeadBy
 *         - startDate
 *         - expectedEndDate
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project
 *         projectKey:
 *           type: string
 *           description: The unique key to identify project
 *         description:
 *           type: string
 *           description: The description of the project
 *         projectLeadBy:
 *           type: number
 *           description: The user leading / managing the project
 *         startDate:
 *           type: string
 *           description: The start date for project
 *           example: "dd/mm/yyyy"
 *         expectedEndDate:
 *           type: string
 *           description: The expected end date for project
 *           example: "dd/mm/yyyy"
 *     GetProjectKey:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project
 *     GetProjectKeySuccess:
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
 *           id:
 *             type: number
 *             description: The id of the project created
 */