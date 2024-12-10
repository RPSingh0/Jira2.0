const express = require('express');
const router = express.Router();
const jiraController = require('../controllers/jiraController');
const authenticationController = require("../controllers/authenticationController");

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
 */
router.route('/getJiraMetadataByJiraKey/:jiraKey')
    .get(jiraController.getJiraMetadataByJiraKey);

/**
 * @swagger
 * /jira/getJira/{projectKey}/{featureKey}:
 *   get:
 *     summary: Get jira under a certain feature
 *     tags: [Jira]
 *     parameters:
 *       - in: path
 *         name: projectKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The project key
 *       - in: path
 *         name: featureKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The feature key
 *     responses:
 *       200:
 *         description: Jira retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraUnderFeatureSuccess'
 */
router.route('/getJira/:projectKey/:featureKey')
    .get(jiraController.getJiraUnderFeature);

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
 */
router.route('/updateSummary')
    .patch(jiraController.updateSummary);

/**
 * @swagger
 * /jira/updateAssignee:
 *   patch:
 *     summary: Update jira assigned to
 *     tags: [Jira]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAssignee'
 *     responses:
 *       200:
 *         description: Assigned to updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateAssigneeSuccess'
 */
router.route('/updateAssignee')
    .patch(jiraController.updateAssignee);

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
 */
router.route('/updateFeature')
    .patch(jiraController.updateFeature);

module.exports = router;