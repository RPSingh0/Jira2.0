const express = require('express');
const userController = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user management routes
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Registers a new user for the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateSuccess'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/create')
    .post(userController.createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user using username and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginSuccess'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/login')
    .post(authenticationController.login);

/**
 * @swagger
 * /user/validateToken:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Validate token
 *     tags: [User]
 *     responses:
 *       204:
 *         description: Token is verified
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/validateToken')
    .get(authenticationController.validateToken);

/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersSuccess'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/getAllUsers')
    .get(userController.getAllUsers);

/**
 * @swagger
 * /user/workedOn:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get jira current user worked on
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           description: The type of jira
 *     responses:
 *       200:
 *         description: Jira retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraUserWorkedOnSuccess'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/workedOn')
    .get(authenticationController.authenticate, userController.workedOn);

module.exports = router;