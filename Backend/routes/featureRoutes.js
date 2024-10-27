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
 * /feature/getFeature/{projectKey}:
 *   get:
 *     summary: Get feature by projectKey
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
 *         description: Features retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFeatureByProjectKeySuccess'
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
router.route('/getFeature/:projectKey')
    .get(featureController.getFeatureByProjectKey);

/**
 * @swagger
 * /feature/getFeature/{projectKey}/{featureKey}:
 *   get:
 *     summary: Get feature by projectKey and featureKey
 *     tags: [Feature]
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
 *         description: Feature retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFeatureByProjectKeyAndFeatureKeySuccess'
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
router.route('/getFeature/:projectKey/:featureKey')
    .get(featureController.getFeatureByProjectKeyAndFeatureKey);

/**
 * @swagger
 * /feature/getFeaturesAsOptionsByProjectKey/{projectKey}:
 *   get:
 *     summary: Get features as options by a project key
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
 *         description: Features retrieved successfully
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

/**
 * @swagger
 * /feature/updateName:
 *   patch:
 *     summary: Updates a feature's name
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFeatureName'
 *     responses:
 *       200:
 *         description: Feature name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateFeatureNameSuccess'
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
router.route('/updateName')
    .patch(featureController.updateName);

/**
 * @swagger
 * /feature/updateDescription:
 *   patch:
 *     summary: Update a feature's description
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFeatureDescription'
 *     responses:
 *       200:
 *         description: Feature description updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateFeatureDescriptionSuccess'
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
    .patch(featureController.updateDescription);

module.exports = router;