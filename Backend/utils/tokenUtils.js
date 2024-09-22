const jwt = require('jsonwebtoken');

/**
 * Takes in an id for a user and returns the signed token
 *
 * @param {string | number} id
 * @returns {string} A signed jwt token
 */
exports.signedToken = function (id) {
    return jwt.sign({id: id}, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
}