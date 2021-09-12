const { Router } = require('express');
const { validateBody } = require('./middlewares');
const { createReview, getReviews } = require('./service')
const { broadCast } = require('../../utils/sockets')

const router = Router();

// map get method for get reviews
router.get('/', async (_, res) => {
    try {
        const rows = await getReviews()
        res.status(200).json(rows)
    }
    catch {
        res.status(500).send("Something went wrong!")
    }
})

// map post for creating new review
router.post('/', validateBody, async (req, res) => {
    const { rating, description } = req.body
    try {
        await createReview(rating, description)
        broadCast(req.path, { rating, description })
        res.status(200).end()
    }
    catch {
        res.status(500).send("Something went wrong!")
    }
})


// listen to sockets
router.ws('/', (ws, req) => {
    console.log('client joined')
})

module.exports = router