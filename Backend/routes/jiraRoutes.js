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
 * /jira/updateSummary:
 *   patch:
 *     summary: Update jira summary
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSummary'
 *     responses:
 *       200:
 *         description: Summary updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateSummarySuccess'
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
router.route('/updateSummary')
    .patch(jiraController.updateSummary);

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

/**
 * @swagger
 * /jira/updatePoints:
 *   patch:
 *     summary: Update jira points
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePoints'
 *     responses:
 *       200:
 *         description: Jira point updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatePointsSuccess'
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
router.route('/updatePoints')
    .patch(jiraController.updatePoints);

/**
 * @swagger
 * /jira/updateFeature:
 *   patch:
 *     summary: Update linked feature to a jira
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFeature'
 *     responses:
 *       200:
 *         description: Jira feature updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateFeatureSuccess'
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
router.route('/updateFeature')
    .patch(jiraController.updateFeature);

module.exports = router;