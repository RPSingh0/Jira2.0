const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const {cleanProjectKey} = require("../utils/utils");
const prisma = require('../db');
const {parsePrismaError} = require("../utils/prismaErrorParser");

class FeatureService {

    static async generateNextFeatureKey(data) {

        try {

            const cleanedKey = cleanProjectKey(data.projectKey);

            const featureCount = await prisma.feature.count({
                where: {
                    projectKey: cleanedKey
                }
            });

            const generatedKey = `FTR-${featureCount + 1}`;

            return {success: true, data: generatedKey}

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error generating feature key`,
            });
        }
    }

    static async createFeature(data) {

        try {
            // generate feature key
            const {data: featureKey} = await FeatureService.generateNextFeatureKey({projectKey: data.projectKey});

            // save the feature
            const feature = await prisma.feature.create({
                data: {
                    name: data.name,
                    featureKey: featureKey,
                    description: data.description,
                    projectKey: data.projectKey
                }
            });

            return {success: true, data: feature}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating feature ${extra ? extra : ""}`,
            });
        }

    }

    static async getFeatureOptions(data) {

        try {

            const features = await prisma.feature.findMany({
                where: {
                    projectKey: data.projectKey
                },
                select: {
                    name: true,
                    featureKey: true,
                    projectKey: true
                }
            });

            if (features.length === 0) {
                return {success: false, message: "No features found"}
            }

            const result = features.map(feature => {
                return {
                    featureKey: feature.featureKey,
                    optionText: `${feature.featureKey} | ${feature.name}`,
                }
            })

            return {success: true, data: result};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching features from DB"
            });
        }
    }

    static async findFeatureByProjectKey(projectKey, page, pageSize, search) {
        try {

            const offset = (page - 1) * pageSize;

            const {count, rows} = await FeatureModel.findAndCountAll({
                attributes: ['name', 'featureKey', 'projectKey', 'description'],
                where: {
                    [Op.and]: [
                        {projectKey: projectKey},
                        {
                            [Op.or]: [
                                {name: {[Op.like]: `%${search}%`}},
                                {featureKey: {[Op.like]: `%${search}%`}}
                            ]
                        }
                    ]
                },
                limit: pageSize,
                offset: offset
            });

            if (count === 0) {
                return {success: false, message: "No features found"}
            }

            let featuresJson = rows.map(feature => feature.toJSON());

            return {
                success: true,
                data: {
                    features: featuresJson,
                    totalRecords: count,
                    totalPages: Math.ceil(count / pageSize),
                    currentPage: page,
                    pageSize: pageSize,
                }
            };

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching feature from DB",
            });
        }
    }

    static async findFeatureByProjectKeyAndFeatureKey(projectKey, featureKey) {
        try {

            const feature = await FeatureModel.findOne({
                attributes: ['name', 'featureKey', 'projectKey', 'description'],
                where: {
                    projectKey: projectKey,
                    featureKey: featureKey
                }
            });

            if (!feature) {
                return {success: false, message: "No feature found"}
            }

            return {success: true, data: feature.toJSON()};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching feature from DB",
            });
        }
    }

    static async updateFeatureName(data) {

        try {

            await prisma.feature.update({
                data: {
                    name: data.name
                },
                where: {
                    projectKey_featureKey: {
                        projectKey: data.projectKey,
                        featureKey: data.featureKey
                    }
                }
            });

            return {success: true, message: "Feature name updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating feature name ${extra ? extra : ""}`,
            });
        }
    }

    static async updateFeatureDescription(data) {

        try {

            await prisma.feature.update({
                data: {
                    description: data.description
                },
                where: {
                    projectKey_featureKey: {
                        projectKey: data.projectKey,
                        featureKey: data.featureKey
                    }
                }
            });

            return {success: true, message: "Feature description updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating feature description ${extra ? extra : ""}`,
            });
        }
    }
}

module.exports = FeatureService;