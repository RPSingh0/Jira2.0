const UserService = require("./UserService");
const ErrorInterceptor = require("../utils/errorInterceptor");
const ErrorType = require("../utils/errorTypes");
const prisma = require('../db');
const {parsePrismaError} = require("../utils/prismaErrorParser");

class JiraService {

    static async generateNextJiraKey(data) {

        try {

            const jiraCount = await prisma.metadata.count({
                where: {
                    projectKey: data.projectKey
                }
            });

            const generatedKey = `${data.projectKey}-${jiraCount + 1}`;

            return {success: true, data: generatedKey}

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error generating jira key`,
            });
        }
    }

    static async createJira(data) {

        try {
            // verify the assignee and reporter are present and active
            const {success: assigneeExists} = await UserService.findByEmailActive(data.assignee);

            if (!assigneeExists) {
                return {success: false, message: "Assignee not found or is not active"};
            }

            const {success: reporterExists} = await UserService.findByEmailActive(data.reporter);

            if (!reporterExists) {
                return {success: false, message: "Reporter not found or is not active"};
            }

            // generate jira key
            const {data: jiraKey} = await JiraService.generateNextJiraKey({projectKey: data.projectKey});

            // generate jira link
            const jiraLink = '/project/' + data.projectKey + '/' + data.featureKey + '/' + jiraKey;

            // start transaction
            const result = await prisma.$transaction(async (tx) => {

                // creating jira
                const jira = await tx.jira.create({
                    data: {
                        summary: data.summary,
                        jiraKey: jiraKey,
                        jiraType: data.jiraType,
                        description: data.description,
                        jiraLink: jiraLink
                    }
                });

                const metadata = await tx.metadata.create({
                    data: {
                        jiraKey: jiraKey,
                        jiraPoint: data.jiraPoint,
                        projectKey: data.projectKey,
                        featureKey: data.featureKey,
                        assignee: data.assignee,
                        reporter: data.reporter
                    }
                });

                return {jira, metadata}

            }, {
                timeout: 2000
            });

            return {
                success: true, data: {
                    jira: result.jira,
                    metadata: result.metadata
                }
            };

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating jira ${extra ? extra : ""}`,
            });
        }
    }

    static async getJiraDetailsByJiraKey(data) {

        try {

            const jira = await prisma.jira.findUnique({
                where: {
                    jiraKey: data.jiraKey
                },
                select: {
                    summary: true,
                    jiraKey: true,
                    jiraType: true,
                    description: true,
                    jiraLink: true
                }
            });

            if (!jira) {
                return {success: false, message: "No jira found"};
            }

            return {success: true, data: jira};

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching jira DB"
            });

        }
    }

    static async getJiraMetadataByJiraKey(data) {

        try {

            const metadata = await prisma.metadata.findUnique({
                where: {
                    jiraKey: data.jiraKey
                },
                include: {
                    project: {
                        select: {
                            name: true
                        }
                    },
                    feature: {
                        select: {
                            name: true
                        }
                    },
                    UserAssignee: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    UserReporter: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    }
                }
            });

            if (!metadata) {
                return {success: false, message: "No jira found"};
            }

            const result = {
                jiraKey: metadata.jiraKey,
                jiraPoint: metadata.jiraPoint,
                assigneeName: `${metadata.UserAssignee.firstName} ${metadata.UserAssignee.lastName}`,
                assigneeEmail: metadata.UserAssignee.email,
                assigneeProfileImage: metadata.UserAssignee.profileImage,
                reporterName: `${metadata.UserReporter.firstName} ${metadata.UserReporter.lastName}`,
                reporterEmail: metadata.UserReporter.email,
                reporterProfileImage: metadata.UserReporter.profileImage,
                projectKey: metadata.projectKey,
                projectName: metadata.project.name,
                featureKey: metadata.featureKey,
                featureName: metadata.feature.name,
                status: metadata.status,
                createdOn: metadata.createdAt
            }

            return {success: true, data: result};

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching jira from DB"
            });

        }
    }

    static async getJiraByProjectKeyAndFeatureKey(data) {

        try {

            const jira = await prisma.jira.findMany({
                where: {
                    metadata: {
                        projectKey: data.projectKey,
                        featureKey: data.featureKey
                    }
                },
                include: {
                    metadata: {
                        include: {
                            UserAssignee: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    profileImage: true
                                }
                            }
                        }
                    }
                }
            });

            if (jira.length === 0) {
                return {success: false, message: "No jira found"};
            }

            const result = jira.map(item => {
                return {
                    summary: item.summary,
                    jiraType: item.jiraType,
                    jiraKey: item.jiraKey,
                    jiraLink: item.jiraLink,
                    assigneeName: `${item.metadata.UserAssignee.firstName} ${item.metadata.UserAssignee.lastName}`,
                    assigneeEmail: item.metadata.UserAssignee.email,
                    assigneeProfileImage: item.metadata.UserAssignee.profileImage,
                    status: item.metadata.status
                }
            });

            return {success: true, data: result};

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching jira DB"
            });

        }
    }

    static async updateJiraSummary(data) {

        try {

            await prisma.jira.update({
                data: {
                    summary: data.summary
                },
                where: {
                    jiraKey: data.jiraKey
                }
            });

            return {success: true, message: "Jira summary updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira summary ${extra ? extra : ""}`,
            });
        }
    }

    static async updateJiraDescription(data) {

        try {

            await prisma.jira.update({
                data: {
                    description: data.description
                },
                where: {
                    jiraKey: data.jiraKey
                }
            });

            return {success: true, message: "Jira description updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira description ${extra ? extra : ""}`,
            });
        }
    }

    static async updateJiraAssignee(data) {

        try {
            // verify the assignee is available and is active
            const {success, message} = await UserService.findByEmailActive(data.assignee);

            if (!success) {
                return {success: false, message: message}
            }

            await prisma.metadata.update({
                data: {
                    assignee: data.assignee
                },
                where: {
                    jiraKey: data.jiraKey
                }
            });

            return {success: true, message: "Jira assignee updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira assignee ${extra ? extra : ""}`,
            });
        }
    }

    static async updateJiraPoints(data) {

        try {
            await prisma.metadata.update({
                data: {
                    jiraPoint: data.jiraPoint
                },
                where: {
                    jiraKey: data.jiraKey
                }
            });

            return {success: true, message: "Jira points updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira points ${extra ? extra : ""}`,
            });
        }
    }

    static async updateJiraFeature(data) {
        try {

            const jiraLink = `/project/${data.projectKey}/${data.featureKey}/${data.jiraKey}`;

            await prisma.metadata.update({
                data: {
                    feature: {
                        connect: {
                            projectKey_featureKey: {
                                projectKey: data.projectKey,
                                featureKey: data.featureKey
                            }
                        }
                    },
                    jira: {
                        update: {
                            jiraLink: jiraLink
                        }
                    }
                },
                where: {
                    jiraKey: data.jiraKey
                }
            });

            return {success: true, message: "Jira feature updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating jira feature ${extra ? extra : ""}`,
            });
        }
    }

    static async getJiraByUserEmail(data) {

        try {
            const skip = (data.page - 1) * data.pageSize;

            const searchCondition = data.search?.length > 0 ? {
                OR: [
                    {jiraKey: {contains: data.search, mode: 'insensitive'}},
                    {summary: {contains: data.search, mode: 'insensitive'}}
                ]
            } : {}

            const jiraTypeCondition = data.type?.length > 0 ? {
                jiraType: data.type
            } : {}

            const whereClause = {
                ...searchCondition,
                ...jiraTypeCondition,
                metadata: {
                    OR: [
                        {assignee: data.user.email},
                        {reporter: data.user.email}
                    ]
                }
            }

            // get total jira
            const totalJira = await prisma.jira.count({
                where: whereClause
            });

            const jiras = await prisma.jira.findMany({
                where: whereClause,
                skip: skip,
                take: data.pageSize,
                select: {
                    jiraKey: true,
                    jiraType: true,
                    summary: true,
                    jiraLink: true,
                    metadata: {
                        select: {
                            status: true,
                            UserAssignee: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    profileImage: true
                                }
                            }
                        }
                    }
                }
            });

            if (jiras.length === 0) {
                return {success: false, message: "No jira available"}
            }

            const result = jiras.map(jira => {
                return {
                    summary: jira.summary,
                    jiraType: jira.jiraType,
                    jiraKey: jira.jiraKey,
                    jiraLink: jira.jiraLink,
                    assigneeName: `${jira.metadata.UserAssignee.firstName} ${jira.metadata.UserAssignee.lastName}`,
                    assigneeEmail: jira.metadata.UserAssignee.email,
                    assigneeProfileImage: jira.metadata.UserAssignee.profileImage,
                    status: jira.metadata.status
                }
            });

            return {
                success: true, data: {
                    jira: result,
                    page: data.page,
                    pageSize: data.pageSize,
                    totalPages: Math.ceil(totalJira / data.pageSize)
                }
            };

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching jira from DB"
            });
        }
    }
}

module.exports = JiraService;