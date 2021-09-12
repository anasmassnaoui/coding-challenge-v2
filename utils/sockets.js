const { wsapp } = require('../app')

broadCast = (path, data = {}) => {
    for (const client of wsapp.getWss(path).clients)
        client.send(JSON.stringify(data))
}

module.exports = {
    broadCast
}