const express = require("express")
const bodyparser = require("body-parser")
const exphbs = require("express-handlebars")
const hbs = require("handlebars")
const moment = require("moment")

const burger = require("./models/burger")

var PORT = process.env.PORT || 8000
var app = express()

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

hbs.registerHelper("relativeTime", (context, options) => {
    return moment(context).fromNow()
})

app.use(express.static("public"))
app.get("/", (req, res) => {
    burger.getAll()
    .then(burgers => {
        res.render("index", {
            burgers: burgers
        })
    })
})
app.use("/api/burger", require("./controllers/burgers_controller"))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
