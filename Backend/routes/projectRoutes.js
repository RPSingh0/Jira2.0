const express = require('express');
const projectController = require('../controllers/projectController');
const authenticationController = require("../controllers/authenticationController");
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
 *     summary: Get all projects as options
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
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

/**
 * @swagger
 * /project/getAllProjects:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllProjectsSuccess'
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
router.route('/getAllProjects')
    .get(authenticationController.authenticate, projectController.getAllProjects);

/**
 * @swagger
 * /project/getProject/{projectKey}:
 *   get:
 *     summary: Get a project by project key
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectKey
 *         required: true
 *         schema:
 *           type: string
 *           description: The project key
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProjectByProjectKeySuccess'
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
router.route('/getProject/:projectKey')
    .get(projectController.getProjectByProjectKey);

/**
 * @swagger
 * /project/updateDescription:
 *   patch:
 *     summary: Update a project's description
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectDescription'
 *     responses:
 *       200:
 *         description: Project description updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProjectDescriptionSuccess'
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
    .patch(projectController.updateDescription);

/**
 * @swagger
 * /project/updateLeadBy:
 *   patch:
 *     summary: Update project lead by
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLeadBy'
 *     responses:
 *       200:
 *         description: Project lead updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateLeadBySuccess'
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
router.route('/updateLeadBy')
    .patch(projectController.updateLeadBy);

module.exports = router;