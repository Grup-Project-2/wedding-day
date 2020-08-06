function errorHandler (err, req, res, next) {

    switch (err.name) {
        case "SequelizeValidationError":
            const message = []
            err.errors.forEach(error => {
                message.push(error.message)
            });
            return res.status(400).json(message.join());
        
        case "ErrorValidation":
            return res.status(err.status).json({
                message: err.message
            })

        case "InvalidToken":
            return res.status(err.status).json({
                message: err.message
            })

        default: return res.status(500).json({
            message: "Internal Server Error"
        })   
    }
    
}

module.exports = errorHandler