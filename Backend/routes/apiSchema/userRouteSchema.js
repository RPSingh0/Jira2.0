/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - status
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         status:
 *           type: string
 *           description: The status for user [active, inactive]
 *         password:
 *           type: string
 *           description: The password of user
 *     UserCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: The id of the user created
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *     UserLoginSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: The jwt auth token for user
 *     GetAllUsersSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the user
 *                   profileImage:
 *                     type: string
 *                     description: The user image of the user
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *     GetJiraUserWorkedOnSuccess:
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
 */