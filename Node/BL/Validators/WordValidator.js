const Joi = require('joi');

const validWord = (_bodyData) => {
    let JoiSchema = Joi.object({
        id: Joi.number().min(1).max(10).required(),
        translate: Joi.string().min(1).max(30).required(),  
        word: Joi.string().min(1).max(30).required()
    });

    return JoiSchema.validate(_bodyData);
}

module.exports = validWord;
