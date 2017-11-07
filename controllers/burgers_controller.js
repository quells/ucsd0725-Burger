const express = require("express")
const orm = require("../config/orm")

var router = express.Router()

router.get("/all", (req, res) => {
    orm.selectAll("burgers")
    .then(results => {
        res.json({
            error: false,
            results: results
        })
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.post("/new", (req, res) => {
    if (req.body.burger_name === undefined) {
        return res.sendStatus(500)
    }
    orm.insertOne("burgers", {
        burger_name: req.body.burger_name,
        created_at: new Date()
    })
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router
