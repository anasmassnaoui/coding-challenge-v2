const { schema } = require('./schemas')

/**
 * middleware to verify the body before handling it
 */
const validateBody = (req, res, next) => {
    const { error: { message } = {} } = schema.validate(req.body)
    if (message)
        return res.status(400).send(message)
    next()
}

module.exports = { validateBody }