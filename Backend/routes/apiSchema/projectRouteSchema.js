/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreate:
 *       required:
 *         - name
 *         - description
 *         - projectLeadBy
 *         - startDate
 *         - expectedEndDate
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         projectLeadBy:
 *           type: string
 *         startDate:
 *           type: string
 *           example: "dd/mm/yyyy"
 *         expectedEndDate:
 *           type: string
 *           example: "dd/mm/yyyy"
 *     GenerateProjectKey:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *     GenerateProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             projectKey:
 *               type: string
 *     ProjectCreateSuccess:
 *       type: object
 *       properties:
 *       status:
 *         type: string
 *       data:
 *         type: object
 *         properties:
 *           projectKey:
 *             type: string
 *     GetAllProjectsAsOptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             projects:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   projectKey:
 *                     type: string
 *                   optionText:
 *                     type: string
 *     GetProjectByProjectKeySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             project:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   projectKey:
 *                     type: string
 *                   description:
 *                     type: string
 *                   leadEmail:
 *                     type: string
 *                   leadName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   expectedEndDate:
 *                     type: string
 *                   daysSpent:
 *                     type: number
 *     UpdateProjectDescription:
 *       required:
 *         - projectKey
 *         - description
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *         description:
 *           type: string
 *     UpdateProjectDescriptionSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     UpdateLeadBy:
 *       required:
 *         - projectKey
 *         - leadBy
 *       type: object
 *       properties:
 *         projectKey:
 *           type: string
 *         leadBy:
 *           type: string
 *     UpdateLeadBySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *     GetAllProjectsSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             projects:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   projectKey:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   expectedEndDate:
 *                     type: string
 *                   daysSpent:
 *                     type: number
 *                   openIssues:
 *                     type: number
 *                   doneIssues:
 *                     type: number
 *                   team:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         profileImage:
 *                           type: string
 *                   completionPercentage:
 *                     type: number
 *                   youWorkedOn:
 *                     type: number
 */