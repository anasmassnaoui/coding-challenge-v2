const { Router } = require('express');
const reviews = require('./reviews')

const router = Router();

/* map reviews routes. */
router.use('/reviews', reviews)

module.exports = router;
