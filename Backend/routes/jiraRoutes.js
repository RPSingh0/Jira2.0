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
 *     security:
 *       - Authorization: []
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
 *         description: Jira created successfully
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

/**
 * @swagger
 * /jira/getJiraDetailsByJiraKey/{jiraKey}:
 *   get:
 *     summary: Get jira details by jira key
 *     tags: [Jira]
 *     parameters:
 *       - in: path
 *         name: jiraKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The jira key
 *     responses:
 *       200:
 *         description: Jira details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraDetailsByJiraKeySuccess'
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
router.route('/getJiraDetailsByJiraKey/:jiraKey')
    .get(jiraController.getJiraDetailsByJiraKey);

/**
 * @swagger
 * /jira/getJiraMetadataByJiraKey/{jiraKey}:
 *   get:
 *     summary: Get jira metadata by jira key
 *     tags: [Jira]
 *     parameters:
 *       - in: path
 *         name: jiraKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The jira key
 *     responses:
 *       200:
 *         description: Jira metadata retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraMetadataByJiraKeySuccess'
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
router.route('/getJiraMetadataByJiraKey/:jiraKey')
    .get(jiraController.getJiraMetadataByJiraKey);

/**
 * @swagger
 * /jira/updateDescription:
 *   patch:
 *     summary: Update jira description
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDescription'
 *     responses:
 *       200:
 *         description: Description updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateDescriptionSuccess'
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
router.route('/updateDescription')
    .patch(jiraController.updateDescription);

/**
 * @swagger
 * /jira/updateAssignedTo:
 *   patch:
 *     summary: Update jira assigned to
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAssignedTo'
 *     responses:
 *       200:
 *         description: Assigned to updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateAssignedToSuccess'
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
router.route('/updateAssignedTo')
    .patch(jiraController.updateAssignedTo);

module.exports = router;