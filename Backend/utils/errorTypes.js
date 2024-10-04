const ErrorType = Object.freeze({
    VALIDATION: 'ValidationError',
    DATABASE: 'DatabaseError',
    UNAUTHORIZED: 'UnauthorizedError',
    FORBIDDEN: 'ForbiddenError',
    NOT_FOUND: 'NotFound',
});

module.exports = ErrorType;