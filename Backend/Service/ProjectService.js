const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const {cleanProjectName} = require("../utils/utils");
const UserService = require("./UserService");
const prisma = require('../db');
const {parsePrismaError} = require("../utils/prismaErrorParser");

class ProjectService {

    static async generateNextProjectKey(data) {

        try {

            const cleanedName = cleanProjectName(data.name);

            const projectCount = await prisma.project.count({
                where: {
                    projectKey: {
                        startsWith: cleanedName
                    }
                }
            });

            const generatedKey = `${cleanedName}${projectCount + 1}`;

            return {success: true, data: generatedKey}

        } catch (err) {

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error generating project key`,
            });
        }
    }

    static async createProject(data) {

        try {
            // verify if the lead is present and is active
            const {success, message} = await UserService.findByEmailActive(data.projectLeadBy);

            if (!success) {
                return {success: false, message: message}
            }

            // generate project key after user is verified
            const {data: projectKey} = await ProjectService.generateNextProjectKey({name: data.name});

            // save the project
            const project = await prisma.project.create({
                data: {
                    name: data.name,
                    projectKey: projectKey,
                    description: data.description,
                    projectLeadBy: data.projectLeadBy,
                    startDate: data.startDate,
                    endDate: data.endDate
                }
            });

            return {success: true, data: project}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating project ${extra ? extra : ""}`,
            });
        }

    }

    static async getProjectOptions() {
        try {

            const projects = await prisma.project.findMany({
                select: {
                    name: true,
                    projectKey: true
                }
            });

            if (projects.length === 0) {
                return {success: false, message: "No projects found"}
            }

            const result = projects.map(project => {
                return {
                    projectKey: project.projectKey,
                    optionText: `${project.projectKey} | ${project.name}`
                }
            });

            return {success: true, data: result};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching projects from DB"
            });
        }
    }

    static async updateProjectDescription(data) {

        try {
            await prisma.project.update({
                data: {
                    description: data.description
                },
                where: {
                    projectKey: data.projectKey
                }
            });

            return {success: true, message: "Project description updated successfully"}

        } catch (err) {
            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating project description ${extra ? extra : ""}`,
            });
        }
    }

    static async updateProjectLead(data) {

        try {
            // verify the lead is available and is active
            const {success, message} = await UserService.findByEmailActive(data.projectLeadBy);

            if (!success) {
                return {success: false, message: message}
            }

            await prisma.project.update({
                data: {
                    projectLeadBy: data.projectLeadBy
                },
                where: {
                    projectKey: data.projectKey
                }
            });

            return {success: true, message: "Project lead updated successfully"}

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error updating project lead ${extra ? extra : ""}`,
            });
        }
    }

    static async getProjectByProjectKey(data) {

        try {
            const project = await prisma.project.findUnique({
                where: {
                    projectKey: data.projectKey
                },
                select: {
                    name: true,
                    projectKey: true,
                    description: true,
                    startDate: true,
                    endDate: true,
                    lead: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    metadata: {
                        select: {
                            status: true
                        }
                    },
                    _count: {
                        select: {
                            metadata: true
                        }
                    }
                }
            });

            if (!project) {
                return {success: false, message: "No projects found"}
            }

            // calculate days remaining for project completion
            let daysRemaining = 0;
            const today = new Date();

            if (project.endDate > today) {
                daysRemaining = Math.ceil((project.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            }

            // count issues by status
            const doneIssues = project.metadata.filter(m => m.status === 'DONE').length;
            const otherIssues = project.metadata.filter(m => m.status !== 'DONE').length;

            const totalIssues = doneIssues + otherIssues;
            const completionPercentage = totalIssues === 0 ? 0 : Math.round((doneIssues / totalIssues) * 100);

            const result = {
                name: project.name,
                projectKey: project.projectKey,
                description: project.description,
                leadName: `${project.lead.firstName} ${project.lead.lastName}`,
                leadEmail: project.lead.email,
                leadProfileImage: project.lead.profileImage,
                startDate: project.startDate,
                endDate: project.endDate,
                daysRemaining: daysRemaining,
                doneIssues: doneIssues,
                openIssues: otherIssues,
                completionPercentage: completionPercentage
            }

            return {success: true, data: result};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching projects from DB"
            });
        }
    }

    static async getAllProjects(data) {

        try {
            const skip = (data.page - 1) * data.pageSize;

            const searchCondition = data.search?.length > 0 ? {
                OR: [
                    {projectKey: {contains: data.search, mode: 'insensitive'}},
                    {name: {contains: data.search, mode: 'insensitive'}}
                ]
            } : {}

            // get total projects
            const totalProjects = await prisma.project.count({
                where: searchCondition
            });

            const projects = await prisma.project.findMany({
                where: searchCondition,
                skip: skip,
                take: data.pageSize,
                select: {
                    name: true,
                    projectKey: true,
                    startDate: true,
                    endDate: true,
                    lead: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true
                        }
                    },
                    metadata: {
                        select: {
                            status: true,
                            assignee: true,
                            reporter: true,
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
                    }
                }
            });

            if (projects.length === 0) {
                return {success: false, message: "No projects available"}
            }

            const result = projects.map(project => {
                // count jira by status
                const doneIssues = project.metadata.filter(m => m.status === 'DONE').length;
                const otherIssues = project.metadata.filter(m => m.status !== 'DONE').length;
                const totalIssues = doneIssues + otherIssues;

                // count user's involved issues
                const youWorkedOn = project.metadata.filter(m => m.assignee === data.user.email || m.reporter === data.user.email).length;

                // completion percentage
                const completionPercentage = totalIssues === 0 ? 0 : Math.round((doneIssues / totalIssues) * 100);

                // calculate days remaining for project completion
                let daysRemaining = 0;
                const today = new Date();

                if (project.endDate > today) {
                    daysRemaining = Math.ceil((project.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                }

                const teamMember = new Map();

                teamMember.set(project.lead.email, {
                    name: `${project.lead.firstName} ${project.lead.lastName}`,
                    email: project.lead.email,
                    profileImage: project.lead.profileImage,
                });

                // Add assignees and reporters
                project.metadata.forEach(meta => {
                    teamMember.set(meta.UserAssignee.email, {
                        name: `${meta.UserAssignee.firstName} ${meta.UserAssignee.lastName}`,
                        email: meta.UserAssignee.email,
                        profileImage: meta.UserAssignee.profileImage,
                    });

                    teamMember.set(meta.UserReporter.email, {
                        name: `${meta.UserReporter.firstName} ${meta.UserReporter.lastName}`,
                        email: meta.UserReporter.email,
                        profileImage: meta.UserReporter.profileImage,
                    });
                });

                const teamMemberArray = Array.from(teamMember.values());

                return {
                    name: project.name,
                    projectKey: project.projectKey,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    daysRemaining: daysRemaining,
                    doneIssues: doneIssues,
                    openIssues: otherIssues,
                    team: teamMemberArray,
                    completionPercentage: completionPercentage,
                    youWorkedOn: youWorkedOn
                }
            })

            return {
                success: true, data: {
                    projects: result,
                    page: data.page,
                    pageSize: data.pageSize,
                    totalPages: Math.ceil(totalProjects / data.pageSize)
                }
            };

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching projects from DB"
            });
        }
    }
}

module.exports = ProjectService;