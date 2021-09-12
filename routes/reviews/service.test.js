const { createReview, getReviews } = require('./service')

describe("reviews", () => {

    it("must create review", async () => {
        await createReview(4, "hello")
        const rows = await getReviews()
        const { rating, description } = rows[rows.length - 1]
        expect(rating).toEqual(4)
        expect(description).toEqual("hello")
    })

    it("must get all reviews", async () => {
        const rows = await getReviews()
        for (const row of rows) {
            expect(Object.keys(row)).toEqual(['rating', 'description'])
            const { rating, description } = row
            expect(typeof rating).toEqual('number')
            expect(typeof description).toEqual('string')
        }
    })

})