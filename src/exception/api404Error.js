const HttpStatus =  require('http2').constants;
const BaseError = require('./BaseError')

class Api404Error extends BaseError {
    constructor( name, statusCode,description, isOperational) {
        
        statusCode = HttpStatus.HTTP_STATUS_FORBIDDEN,
        description = 'Not found.',
        isOperational = true

        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api404Error
