const ErrorType = require("./errorTypes");

module.exports = (err, req, res, next) => {

    /**
     * All the `validation` errors will end up here
     */
    if (err.type === ErrorType.VALIDATION) {
        return res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

    /**
     * All the `database` errors will end up here
     */
    if (err.type === ErrorType.DATABASE) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}