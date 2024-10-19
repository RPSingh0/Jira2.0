const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: The Project management routes
 */

/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: Creates a new project for the application
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreate'
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.route('/create')
    .post(projectController.createProject);

/**
 * @swagger
 * /project/generateProjectKey:
 *   post:
 *     summary: Generates a new project key using project name
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateProjectKey'
 *     responses:
 *       201:
 *         description: Project key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateProjectKeySuccess'
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
router.route('/generateProjectKey')
    .post(projectController.generateProjectKey);

/**
 * @swagger
 * /project/getAllProjectsAsOptions:
 *   get:
 *     summary: Get all projects from db
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Get all projects from db
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllProjectsAsOptionSuccess'
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
router.route('/getAllProjectsAsOptions')
    .get(projectController.getAllProjectsAsOptions);

module.exports = router;