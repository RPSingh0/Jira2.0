class Response {
    static ok200(res, data) {
        res.status(200).json({
            status: 'success',
            data: data
        });
    }

    static ok204(res) {
        res.status(204).send();
    }

    static badRequest400(res, data) {
        res.status(400).json({
            status: 'fail',
            message: data.message
        });
    }

    static unauthorized401(res, data) {
        res.status(401).json({
            status: 'fail',
            message: data.message
        });
    }

    static forbidden403(res, data) {
        res.status(403).json({
            status: 'fail',
            message: data.message
        });
    }

    static notFound404(res, data) {
        res.status(404).json({
            status: 'fail',
            message: data.message
        });
    }

    static internalServer500(res, data) {
        res.status(500).json({
            status: 'fail',
            message: data.message
        })
    }
}

module.exports = Response;