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
 * /feature/getFeatureKey:
 *   post:
 *     summary: Generates a new feature key using project id
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetFeatureKey'
 *     responses:
 *       201:
 *         description: Feature key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFeatureKeySuccess'
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
router.route('/getFeatureKey')
    .post(featureController.getFeatureKey);

module.exports = router;