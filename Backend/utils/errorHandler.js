const sendInternalServerError = (error, res) => {
    return res.status(500).json({
        status: 'fail',
        message: error
    });
}

module.exports = (err, req, res, next) => {
    let error = err.message;
    return sendInternalServerError(error, res);
}