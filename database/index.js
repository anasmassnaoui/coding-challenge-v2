const { Database } = require('sqlite3')
const path = require('path')

/*
initialize db connection
create tables if they aren't created before
*/
const db = new Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) throw err
    db.exec('CREATE TABLE reviews (rating int, description text)', (err) => null)
})

module.exports = { db }