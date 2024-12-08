const jwt = require('jsonwebtoken');

/**
 * Takes in an id for a user and returns the signed token
 *
 * @param {string} email
 * @returns {string} A signed jwt token
 */
exports.signedToken = function (email) {
    return jwt.sign({email: email}, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
}