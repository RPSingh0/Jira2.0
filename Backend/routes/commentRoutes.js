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
    .get(authenticationController.authenticate, commentController.getProjectComment)
module.exports = router;