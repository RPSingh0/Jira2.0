/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureCreate:
 *       required:
 *         - name
 *         - description
 *         - projectKey
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the feature
 *         description:
 *           type: string
 *           description: The description of the feature
 *         projectKey:
 *           type: string
 *           description: The project this feature belongs to
 *     FeatureCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             featureKey:
 *               type: string
 *               description: The feature key of the feature created
 *     GetFeaturesAsOptionsByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for this request
 *         data:
 *           type: object
 *           properties:
 *             features:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   featureKey:
 *                     type: string
 *                     description: The feature key for the feature
 *                   optionText:
 *                     type: string
 *                     description: The option text to show for frontend
 */