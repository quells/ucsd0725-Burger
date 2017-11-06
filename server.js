const express = require("express")
const bodyparser = require("body-parser")
const exphbs = require("express-handlebars")

var PORT = process.env.PORT || 8000
var app = express()

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.static("public"))
app.use("/api/burger", require("./controllers/burgers_controller"))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
