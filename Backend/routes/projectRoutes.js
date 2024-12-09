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
 */
router.route('/generateProjectKey')
    .post(projectController.generateProjectKey);

/**
 * @swagger
 * /project/getProjectOptions:
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
 */
router.route('/getProjectOptions')
    .get(projectController.getProjectOptions);

/**
 * @swagger
 * /project/getAllProjects:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all projects
 *     tags: [Project]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllProjectsSuccess'
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
 */
router.route('/updateDescription')
    .patch(projectController.updateDescription);

/**
 * @swagger
 * /project/updateLead:
 *   patch:
 *     summary: Update project lead
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectLead'
 *     responses:
 *       200:
 *         description: Project lead updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProjectLeadSuccess'
 */
router.route('/updateLead')
    .patch(projectController.updateLead);

module.exports = router;