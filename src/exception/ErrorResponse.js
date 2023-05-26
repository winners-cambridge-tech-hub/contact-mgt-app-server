const Validator = require('fastest-validator');

class ErrorResponse {

    constructor(errorCode, error, errorMessage, servicePath) {
        this.errorCode = errorCode;
        this.error = error;
        this.errorMessage = errorMessage;
        this.servicePath = servicePath;
        this.timestamp = timestamp;
    }

    getError(title) {
        this.title = title;
    }

}

module.exports = {
    ErrorResponse: ErrorResponse
}
