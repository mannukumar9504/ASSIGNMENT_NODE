/**
 * controller for user authentications
*/
const Response = require('../../config/response_message');
const { users }  = require('../../pg_model/index')
const { USER_CREATED_SUCCESSFULLY, USER_LOGGED_IN, USER_NOT_FOUND } = require('../../constants/constant');
const logger = require('../../logger/logger')


/**
 * function to register a user
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = async (req, res) => {
    try {
        const user = JSON.parse(JSON.stringify(req.body)); 
        user['userId'] = user.email.split('@')[0];

        const result = await users.create(user);
        if(result) {
            new Response(res).SUCCESS_RESPONSE({"message": USER_CREATED_SUCCESSFULLY});
        }
    } catch(err) {
        logger.errorLoggging(err);
        new Response(res).INTERNAL_ERROR_RESPONSE(err);
    }
}
/**
 * function to user login 
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        const { userId, password } = JSON.parse(JSON.stringify(req.body));
        const result = await users.findOne(
            {
                attributes: ['firstName', 'lastName'],
                where: { userId, password }
            });
        if(result) {
            new Response(res).SUCCESS_RESPONSE({"message": USER_LOGGED_IN});
        } else {
            new Response(res).NOT_FOUND_RESPONSE(USER_NOT_FOUND);
        }

    } catch (err) {
        logger.errorLoggging(err);
        new Response(res).INTERNAL_ERROR_RESPONSE(err);
    }
}
/**
 * fuction to reset the password
 * @param {*} req 
 * @param {*} res 
 */
const passwordReset = (req, res) => {
    try {

    } catch(err) {

    }
}

module.exports = {
    registerUser,
    passwordReset,
    loginUser
}