/**
 * controller for user authentications
*/
const Response = require('../../config/response_message');
const { users, sessions}  = require('../../pg_model/index');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { SALT_ROUND } = process.env;
const { USER_CREATED_SUCCESSFULLY, USER_LOGGED_IN, USER_NOT_FOUND, USER_ALREADY_EXISTS } = require('../../constants/constant');
const logger = require('../../logger/logger');
const CryptoJS = require("crypto-js");


/**
 * function to register a user
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = async (req, res) => {
    try {
        const user = JSON.parse(JSON.stringify(req.body));
        user['userId'] = user.email.split('@')[0];

        const userId = await users.findOne({ where: { email: user.email } });
        if (userId?.id) {
            return new Response(res).DUPLICATE_RESPONSE(USER_ALREADY_EXISTS);
        }
        const { saltValue, hash } = encryptPassword(user?.password || '','');
        user['password'] = hash;
        user['secret_key'] = saltValue;
        const result = await users.create(user);
        if (result) {
            new Response(res).SUCCESS_RESPONSE({}, USER_CREATED_SUCCESSFULLY);
        }
    } catch (err) {
        logger.errorLoggging(err);
        new Response(res).INTERNAL_ERROR_RESPONSE(err);
    }
}
/**
 * function to encrypt password
 * @param {*} payload 
 * @returns 
 */
const encryptPassword = (password , salt='') => {

    const saltValue = salt?.length ? salt :bcrypt.genSaltSync(parseInt(SALT_ROUND));
    const hash = bcrypt.hashSync(password, saltValue);
    return {saltValue , hash};
     
}
/**
 * function to user login 
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        let { userId, password } = JSON.parse(JSON.stringify(req.body));
        console.log(userId, password)
        password = CryptoJS.AES.decrypt(password, userId).toString(CryptoJS.enc.Utf8);
        const result = await users.findOne(
            {
                attributes: ['firstName', 'lastName', 'password' , 'secret_key'],
                where: { userId }
            });
        if(result) {
            const { hash: password_hash } = encryptPassword (password, result.secret_key);
            if(result.password === password_hash) {
                const accessToken = jwt.sign({userName: result.userId, password: result.password}, "secret", { expiresIn: `${new Date().getTime() + (1*3600*1000)}`});
                await addSession(userId , accessToken);
                new Response(res).SUCCESS_RESPONSE({ token: accessToken ,"message": USER_LOGGED_IN});
            } else {
               return  new Response(res).NOT_FOUND_RESPONSE(USER_NOT_FOUND);
            }
        } else {
            new Response(res).NOT_FOUND_RESPONSE(USER_NOT_FOUND);
        }

    } catch (err) {
        logger.errorLoggging(err);
        new Response(res).INTERNAL_ERROR_RESPONSE(err);
    }
}
/**
 * add session entry 
 * @param {*} userId 
 * @param {*} token 
 */
const addSession = async(userId, token) => {
    try {
        const sessionsData = {
            userId,
            token,
            session_starts_at: new Date().getTime(),
            session_expires_at: new Date(new Date().getTime() + 1*60*1000).getTime()
        };

        await sessions.create(sessionsData);
    } catch(err) {
        throw new Error(err);
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