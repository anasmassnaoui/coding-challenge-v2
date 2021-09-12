const app = require("./app")
const PORT = 8080

// start server on port PORT
app.listen(PORT, () => {
    console.log(`server up on port ${PORT}!`)
})