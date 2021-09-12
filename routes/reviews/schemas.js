const Joi = require("joi")

// define the body schema
const schema = Joi.object({
    rating: Joi.number().required(),
    description: Joi.string().required()
})

module.exports = { schema }