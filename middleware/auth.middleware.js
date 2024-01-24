const jwt = require('jsonwebtoken');
const { sessions } = require('../pg_model/index')
const Response = require('../config/response_message');
const { SESSION_EXPIRED } = require('../constants/constant');
/**
 * authenticate user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authenticateUser = async (req, res, next) => {
    let { 'auth-token': token } = req.headers;
    token  = token.split(' ')[1];
    const result  = await sessions.findOne({
        attributes: ['session_expires_at', 'session_starts_at'],
        where: {token}
    });
    if( result.session_expires_at && result.session_expires_at > new Date().getTime() ) {
        next();
    } else {
        return new Response(res).SESSION_EXPIRED_RESPONSE(SESSION_EXPIRED);
    }
   
}

module.exports = {
    authenticateUser
}