const ErrorType = require("./errorTypes");
const Response = require('./response');

module.exports = (err, req, res, next) => {

    /**
     * All the `validation` errors will end up here
     */
    if (err.type === ErrorType.VALIDATION) {
        return Response.badRequest400(res, {
            message: err.message
        });
    }

    /**
     * All the `database` errors will end up here
     */
    if (err.type === ErrorType.DATABASE) {
        return Response.internalServer500(res, {
            message: err.message
        })
    }

    /**
     * All the `unauthorized` errors will end up here
     */
    if (err.type === ErrorType.UNAUTHORIZED) {
        return Response.unauthorized401(res, {
            message: err.message
        });
    }

    /**
     * All the `forbidden` errors will end up here
     */
    if (err.type === ErrorType.FORBIDDEN) {
        return Response.forbidden403(res, {
            message: err.message
        });
    }

    /**
     * All the `not found` errors will end up here
     */
    if (err.type === ErrorType.NOT_FOUND) {
        return Response.notFound404(res, {
            message: err.message
        })
    }
}