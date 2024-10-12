/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureCreate:
 *       required:
 *         - name
 *         - featureKey
 *         - description
 *         - projectId
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the feature
 *         featureKey:
 *           type: string
 *           description: The unique key to identify feature per project
 *         description:
 *           type: string
 *           description: The description of the feature
 *         projectId:
 *           type: number
 *           description: The project this feature belongs to
 *     GetFeatureKey:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 *           description: The id of the project
 *     GetFeatureKeySuccess:
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
 *               description: The new feature key
 *     FeatureCreateSuccess:
 *       type: object
 *       properties:
 *       status:
 *         type: string
 *         description: The status for this request
 *       data:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             description: The id of the feature created
 */