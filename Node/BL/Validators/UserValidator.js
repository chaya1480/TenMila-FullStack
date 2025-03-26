const Joi = require('joi');

const validUser = (_bodyData) => {
    let JoiSchema = Joi.object({
        username: Joi.string().min(1).max(20).required(),
        password: Joi.string().min(1).max(20).required(),  
    });

    return JoiSchema.validate(_bodyData);
}

module.exports = validUser;
