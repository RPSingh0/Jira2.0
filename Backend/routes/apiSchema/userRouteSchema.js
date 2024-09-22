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
 *       status:
 *         type: string
 *         description: The status for this request
 *       data:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *             description: The first name of the user
 *           lastName:
 *             type: string
 *             description: The last name of the user
 *           email:
 *             type: string
 *             description: The email address of the user
 *           status:
 *             type: string
 *             description: The active/inactive status of the user
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
 */