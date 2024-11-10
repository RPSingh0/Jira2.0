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
 *         description:
 *           type: string
 *         projectKey:
 *           type: string
 *     FeatureCreateSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             featureKey:
 *               type: string
 *     GetFeaturesAsOptionsByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
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
 *                   optionText:
 *                     type: string
 *     GetFeatureByProjectKeyAndFeatureKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             feature:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   featureKey:
 *                     type: string
 *                   projectKey:
 *                     type: string
 *                   description:
 *                     type: string
 *     GetFeatureByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             feature:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   featureKey:
 *                     type: string
 *                   projectKey:
 *                     type: string
 *                   description:
 *                     type: string
 *     UpdateFeatureName:
 *       required:
 *         - projectKey
 *         - featureKey
 *         - name
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *         featureKey:
 *           type: string
 *         name:
 *           type: string
 *     UpdateFeatureNameSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdateFeatureDescription:
 *       required:
 *         - projectKey
 *         - featureKey
 *         - description
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *         featureKey:
 *           type: string
 *         description:
 *           type: string
 *     UpdateFeatureDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */