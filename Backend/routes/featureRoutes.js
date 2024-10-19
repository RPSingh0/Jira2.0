const express = require('express');
const featureController = require('../controllers/featureController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feature
 *   description: The Feature management routes
 */

/**
 * @swagger
 * /feature/create:
 *   post:
 *     summary: Creates a new feature for a project
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeatureCreate'
 *     responses:
 *       201:
 *         description: Feature created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureCreateSuccess'
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
    .post(featureController.createFeature);

/**
 * @swagger
 * /feature/getFeaturesAsOptionsByProjectKey/{projectKey}:
 *   get:
 *     summary: Get features as option by a project key
 *     tags: [Feature]
 *     parameters:
 *       - in: path
 *         name: projectKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The project key
 *     responses:
 *       200:
 *         description: All features by project key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFeaturesAsOptionsByProjectKeySuccess'
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
router.route('/getFeaturesAsOptionsByProjectKey/:projectKey')
    .get(featureController.getFeaturesAsOptionsByProjectKey);

module.exports = router;