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
 */
router.route('/validateToken')
    .get(authenticationController.authenticate, authenticationController.validateToken);

/**
 * @swagger
 * /user/getAllActiveUsers:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersSuccess'
 */
router.route('/getAllActiveUsers')
    .get(userController.getAllActiveUsers);

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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jiras retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraUserWorkedOnSuccess'
 */
router.route('/workedOn')
    .get(authenticationController.authenticate, userController.workedOn);

module.exports = router;