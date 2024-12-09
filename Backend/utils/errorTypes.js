const ErrorType = Object.freeze({
    VALIDATION: 'ValidationError',
    DATABASE: 'DatabaseError',
    UNAUTHORIZED: 'UnauthorizedError',
    FORBIDDEN: 'ForbiddenError',
    NOT_FOUND: 'NotFound',
    INTERNAL_SERVER_ERROR: 'InternalServerError'
});

module.exports = ErrorType;