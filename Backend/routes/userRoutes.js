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
 *       404:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */
router.route('/login')
    .post(authenticationController.login);

module.exports = router;