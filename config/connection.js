const mysql = require("mysql2")

var pool
var db_name
if (process.env.JAWSDB_URL !== undefined) {
    pool = mysql.createPool(process.env.JAWSDB_URL)
    console.log(process.env)
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

module.exports = {
    
}
