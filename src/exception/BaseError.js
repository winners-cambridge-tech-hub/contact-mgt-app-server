class BaseError extends Error {

    constructor(name, statusCode, servicePath, description) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.servicePath = servicePath
        Error.captureStackTrace(this)
    }
    
}

module.exports = BaseError
