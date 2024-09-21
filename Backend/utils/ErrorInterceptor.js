/**
 * ErrorInterceptor class will handle all the errors thrown throughout entire code
 */
class ErrorInterceptor extends Error {

    /**
     * ErrorInterceptor class constructor will have all the details including traceback to route to error root cause
     * @param {Object} details
     */
    constructor(details) {
        super(details.message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}