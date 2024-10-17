const express = require('express');
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const jiraController = require('../controllers/jiraController');

/**
 * @swagger
 * tags:
 *   name: Jira
 *   description: The Jira management routes
 */

/**
 * @swagger
 * /jira/create:
 *   post:
 *     summary: Creates a new jira for the application
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JiraCreate'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JiraCreateSuccess'
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
    .post(authenticationController.authenticate, jiraController.createJira);

module.exports = router;