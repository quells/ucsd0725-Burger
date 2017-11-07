const mysql = require("mysql2")

var pool
var db_name
if (process.env.JAWSDB_URL !== undefined) {
    var parts = process.env.JAWSDB_URL.split("/")
    db_name = parts[parts.length-1]
    pool = mysql.createPool(process.env.JAWSDB_URL)
} else {
    db_name = "burgers_db"
    pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "",
        database: db_name
    })
}

module.exports = pool
