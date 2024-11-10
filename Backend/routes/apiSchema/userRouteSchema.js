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
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         password:
 *           type: string
 *     UserCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserLoginSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     GetAllUsersSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
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
 *                   profileImage:
 *                     type: string
 *                   email:
 *                     type: string
 *     GetJiraUserWorkedOnSuccess:
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
 *                   assigneeProfileImage:
 *                     type: string
 *                   statusType:
 *                     type: string
 */