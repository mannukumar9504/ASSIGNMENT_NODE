/**
 * authenticate user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authenticateUser = (req, res, next) => {
    return next();
}

module.exports = {
    authenticateUser
}