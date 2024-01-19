const { BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS, NOT_FOUND }  = require( "../constants/constant");

class Response {
    res = {}
    constructor(res) {
        this.res = res
    }

    SUCCESS_RESPONSE(data = null, message = '') {
        return this.res.send(SUCCESS, { data, message });
    }

    BAD_REQUEST_RESPONSE(data={}, error = '') {
        return this.res.send(BAD_REQUEST, {data, error});
    }

    INTERNAL_ERROR_RESPONSE(err) {
        return this.res.send(INTERNAL_SERVER_ERROR, {errorMessage: 'INTERNAL SERVER ERROR'});
    }
    
    NOT_FOUND_RESPONSE(message) {
        return this.res.send(NOT_FOUND, {'message': message});
    }
}
module.exports = Response;