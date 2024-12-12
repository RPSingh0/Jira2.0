const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const authenticationController = require('../controllers/AuthenticationController');

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The comment management routes
 */

/**
 * @swagger
 * /comment/project/create:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Adds a new project comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCommentCreate'
 *     responses:
 *       201:
 *         description: Project comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectCommentCreateSuccess'
 */
router.route('/project/create')
    .post(authenticationController.authenticate, commentController.createProjectComment);

/**
 * @swagger
 * /comment/project/get/{projectKey}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all comments for one project
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: projectKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProjectCommentsSuccess'
 */
router.route('/project/get/:projectKey')
    .get(authenticationController.authenticate, commentController.getProjectComment);

/**
 * @swagger
 * /comment/feature/create:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Adds a new feature comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeatureCommentCreate'
 *     responses:
 *       201:
 *         description: Project comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureCommentCreateSuccess'
 */
router.route('/feature/create')
    .post(authenticationController.authenticate, commentController.createFeatureComment);

/**
 * @swagger
 * /comment/feature/get/{projectKey}/{featureKey}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all comments for one feature
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: projectKey
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: featureKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFeatureCommentsSuccess'
 */
router.route('/feature/get/:projectKey/:featureKey')
    .get(authenticationController.authenticate, commentController.getFeatureComment);

/**
 * @swagger
 * /comment/jira/create:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Adds a new jira comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JiraCommentCreate'
 *     responses:
 *       201:
 *         description: Jira comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JiraCommentCreateSuccess'
 */
router.route('/jira/create')
    .post(authenticationController.authenticate, commentController.createJiraComment);

/**
 * @swagger
 * /comment/jira/get/{jiraKey}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all comments for one jira
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: jiraKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetJiraCommentsSuccess'
 */
router.route('/jira/get/:jiraKey')
    .get(authenticationController.authenticate, commentController.getJiraComment);

module.exports = router;