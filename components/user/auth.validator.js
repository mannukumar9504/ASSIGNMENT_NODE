const { Joi } = require('express-validation');


const loginValidation = {
    body: Joi.object({
        userId: Joi.string().required(),
        password: Joi.string().required()
    })
};

const registerValidation = {
    body: Joi.object({
        firstName: Joi.string().required(),
        middleName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobile: Joi.number().required(),
        email: Joi.string().regex(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    })
}
module.exports = {
    loginValidation,
    registerValidation
}