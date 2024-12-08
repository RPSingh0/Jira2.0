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

            return {success: true, data: projects};

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
}

module.exports = ProjectService;