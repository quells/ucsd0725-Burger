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

module.exports = router
