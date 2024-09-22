const ErrorType = Object.freeze({
    VALIDATION: 'ValidationError',
    DATABASE: 'DatabaseError',
    UNAUTHORIZED: 'UnauthorizedError',
    NOT_FOUND: 'NotFound',
});

module.exports = ErrorType;