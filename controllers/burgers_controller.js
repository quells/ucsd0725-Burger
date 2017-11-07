const express = require("express")
const burger = require("../models/burger")

var router = express.Router()

router.get("/all", (req, res) => {
    burger.getAll()
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
    burger.createNew(req.body.burger_name)
    .then(() => {
        res.redirect("/")
    })
    .catch(err => {
        console.error(err)
        res.redirect("/?error=true")
    })
})

router.put("/devour/:id", (req, res) => {
    burger.devour(req.params.id)
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router
