const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const db = require('./queries')
app.use(bodyparser.json())
app.use(cors())


app.get("/", (req, res) => {
    res.status(200).json({message : "Home"})
})

app.get("/expenses", db.getExpenses)
app.post("/add-expense", db.addExpenses)

app.listen(8080, () => console.log("App listening on port 8080"))