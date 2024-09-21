const express = require('express');
const userController = require("../controllers/userController");

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

module.exports = router;