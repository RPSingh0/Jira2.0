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
                return {success: false, data: []}
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

    static async findFeatureByProjectKey(data) {

        try {
            const skip = (data.page - 1) * data.pageSize;

            const searchCondition = data.search?.length > 0 ? {
                OR: [
                    {projectKey: data.projectKey, name: {contains: data.search, mode: 'insensitive'}},
                    {projectKey: data.projectKey, featureKey: {contains: data.search, mode: 'insensitive'}},
                ]
            } : {
                projectKey: data.projectKey
            }

            const totalFeatures = await prisma.feature.count({
                where: searchCondition
            });

            const features = await prisma.feature.findMany({
                where: searchCondition,
                skip: skip,
                take: data.pageSize,
                select: {
                    name: true,
                    featureKey: true,
                    projectKey: true,
                    description: true
                }
            });

            if (features.length === 0) {
                return {success: false, message: "No features available"};
            }

            return {
                success: true,
                data: {
                    features: features,
                    page: data.page,
                    pageSize: data.pageSize,
                    totalPages: Math.ceil(totalFeatures / data.pageSize)
                }
            };

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching feature from DB",
            });
        }
    }

    static async findFeatureByProjectKeyAndFeatureKey(data) {

        try {
            const feature = await prisma.feature.findUnique({
                where: {
                    projectKey_featureKey: {
                        projectKey: data.projectKey,
                        featureKey: data.featureKey
                    }
                },
                select: {
                    name: true,
                    featureKey: true,
                    projectKey: true,
                    description: true
                }
            });

            if (!feature) {
                return {success: false, message: "No feature found"}
            }

            return {success: true, data: feature};

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