const bcrypt = require('bcryptjs');
const ErrorInterceptor = require('../utils/errorInterceptor');
const ErrorType = require('../utils/errorTypes');
const prisma = require('../db');
const {parsePrismaError} = require("../utils/prismaErrorParser");

class UserService {

    static async createUser(data) {

        const {firstName, lastName, email, password, profileImage} = data;

        try {

            // encrypt the user password
            const hashSalt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, hashSalt);

            const user = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    profileImage: profileImage,
                    password: hashedPassword
                }
            });

            return {success: true, data: user};

        } catch (err) {

            const extra = parsePrismaError(err);

            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: `Error creating user ${extra ? extra : ""}`,
            });
        }
    }

    static async getAllActiveUsers() {

        try {

            const users = await prisma.user.findMany({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true
                },
                where: {
                    status: true
                }
            });

            if (users.length === 0) {
                return {success: false, message: "No users found"}
            }

            return {success: true, data: users};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching users from DB"
            });
        }
    }

    static async findByEmail(email) {
        try {

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
                    status: true
                }
            });

            if (!user) {
                return {success: false, message: "No user found"};
            }

            return {success: true, data: user};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching user from DB"
            });
        }
    }

    static async findByEmailActive(email) {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    status: true
                },
                select: {
                    email: true,
                    password: true,
                    passwordChangedAt: true
                }
            })

            if (!user) {
                return {success: false, message: "No user found or user not active"};
            }

            return {success: true, data: user};

        } catch (err) {
            throw new ErrorInterceptor({
                type: ErrorType.DATABASE,
                message: "Error fetching user from DB"
            });
        }
    }
}

module.exports = UserService;