const Joi = require('joi');

const validUserWord = (_bodyData) => {
    let JoiSchema = Joi.object({
        learnedWords: Joi.array().items(
            Joi.object({
                word: Joi.string().required(),
                translate: Joi.string().required()
            })
        ).required()
    });

    return JoiSchema.validate(_bodyData);
}

module.exports = validUserWord;
