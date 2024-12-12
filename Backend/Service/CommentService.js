const prisma = require("../db");
const {parsePrismaError} = require("../utils/prismaErrorParser");
const ErrorInterceptor = require("../utils/errorInterceptor");
const ErrorType = require("../utils/errorTypes");

class CommentService {
    static async createProjectComment(data) {

        try {
            const comment = await prisma.projectComment.create({
                data: {
                    projectKey: data.projectKey,
                    authorEmail: data.user.email,
                    content: data.content
                }
            });

            return {success: true, data: comment};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating project comment ${extra ? extra : ""}`,
            });
        }
    }

    static async getProjectComments(data) {
        try {
            const comments = await prisma.projectComment.findMany({
                where: {
                    projectKey: data.projectKey
                },
                select: {
                    projectKey: true,
                    content: true,
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    updatedAt: true
                },
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            });

            if (comments.length === 0) {
                return {success: true, data: []}
            }

            const result = comments.map(comment => {
                return {
                    projectKey: comment.projectKey,
                    content: comment.content,
                    authorEmail: comment.author.email,
                    authorName: `${comment.author.firstName} ${comment.author.lastName}`,
                    authorProfileImage: comment.author.profileImage,
                    updatedAt: comment.updatedAt
                }
            });

            return {success: true, data: result};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching project comments ${extra ? extra : ""}`,
            });
        }
    }

    static async createFeatureComment(data) {

        try {
            const comment = await prisma.featureComment.create({
                data: {
                    projectKey: data.projectKey,
                    featureKey: data.featureKey,
                    authorEmail: data.user.email,
                    content: data.content
                }
            });

            return {success: true, data: comment};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating feature comment ${extra ? extra : ""}`,
            });
        }
    }

    static async getFeatureComments(data) {
        try {
            const comments = await prisma.featureComment.findMany({
                where: {
                    projectKey: data.projectKey,
                    featureKey: data.featureKey
                },
                select: {
                    projectKey: true,
                    featureKey: true,
                    content: true,
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    updatedAt: true
                },
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            });

            if (comments.length === 0) {
                return {success: true, data: []}
            }

            const result = comments.map(comment => {
                return {
                    projectKey: comment.projectKey,
                    featureKey: comment.featureKey,
                    content: comment.content,
                    authorEmail: comment.author.email,
                    authorName: `${comment.author.firstName} ${comment.author.lastName}`,
                    authorProfileImage: comment.author.profileImage,
                    updatedAt: comment.updatedAt
                }
            });

            return {success: true, data: result};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching feature comments ${extra ? extra : ""}`,
            });
        }
    }

    static async createJiraComment(data) {

        try {
            const comment = await prisma.jiraComment.create({
                data: {
                    jiraKey: data.jiraKey,
                    authorEmail: data.user.email,
                    content: data.content
                }
            });

            return {success: true, data: comment};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating jira comment ${extra ? extra : ""}`,
            });
        }
    }

    static async getJiraComments(data) {
        try {
            const comments = await prisma.jiraComment.findMany({
                where: {
                    jiraKey: data.jiraKey
                },
                select: {
                    jiraKey: true,
                    content: true,
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    updatedAt: true
                },
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            });

            if (comments.length === 0) {
                return {success: true, data: []}
            }

            const result = comments.map(comment => {
                return {
                    jiraKey: comment.jiraKey,
                    content: comment.content,
                    authorEmail: comment.author.email,
                    authorName: `${comment.author.firstName} ${comment.author.lastName}`,
                    authorProfileImage: comment.author.profileImage,
                    updatedAt: comment.updatedAt
                }
            });

            return {success: true, data: result};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error fetching jira comments ${extra ? extra : ""}`,
            });
        }
    }
}

module.exports = CommentService;