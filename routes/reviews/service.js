const { db } = require('../../database')

/**
 * insert review in database
 * @param rating A number goes from 0 to 5
 * @param description A string describe user feedback
 */
const createReview = (rating, description) => new Promise((resolve, reject) => {
    let query = db.prepare("INSERT INTO reviews VALUES (?, ?)")
    query.run(rating, description)
    query.finalize(err => err ? reject(err) : resolve())
})

/**
 * get all reviews from database
 */
const getReviews = () =>
    new Promise((resolve, reject) =>
        db.all('SELECT rating, description FROM reviews', (err, rows) => err ? reject(err) : resolve(rows)));

module.exports = {
    createReview,
    getReviews
}