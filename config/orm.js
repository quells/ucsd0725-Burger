const connection = require("./connection")

function query(q, literals) {
    literals = literals || []
    return new Promise((resolve, reject) => {
        connection.query(q, literals, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

function parseWhere(where) {
    /*
where: {
    id: 123,
    id_lt: 123,
    id_(lte|gt|gte|ne)
}
    */
    if (where === undefined) return null

    var constraints = []
    var literals = []
    for (var key in where) {
        var col_name = key
        var op = "="
        var parts = key.split("_")
        if (parts.length > 1) {
            col_name = parts[0]
            switch (parts[1]) {
                case "lt": op = "<"; break
                case "gt": op = ">"; break
                case "ne": op = "!="; break // also "<>", depending on SQL implementation
                case "lte": op = "<="; break
                case "gte": op = ">="; break
                default: console.error(`invalid comparison key '${parts[1]}' in '${key}'`); continue
            }
        }
        constraints.push(`${col_name} ${op} ?`)
        literals.push(where[key])
    }
    return {
        sql: " WHERE " + constraints.join(", "),
        values: literals
    }
}

function parseOrderBy(ordered) {
/*
// At most 1 child
ordered: {
    asc: col_name,
    ascending: col_name,
    desc: col_name,
    descending: col_name
}
*/
    if (ordered === undefined) return null

    var keyCount = Object.keys(ordered).length
    if (keyCount > 1) {
        return console.error(`invalid number of ordering options: found ${keyCount}, expected no more than 1`)
    }

    for (var key in ordered) {
        switch (key) {
            case "asc":
            case "ascending":
                return {
                    sql: ` ORDER BY ${ordered[key]} ASC`
                }
            case "desc":
            case "descending":
                return {
                    sql: ` ORDER BY ${ordered[key]} DESC`
                }
        }
    }
}

module.exports = {
    selectAll: function(table, options) {
        options = options || {}
        var literals = []

        var q = `SELECT * FROM ${table}`
        var where = parseWhere(options.where)
        var orderBy = parseOrderBy(options.ordered)

        if (where !== null) {
            q += where.sql
            literals = literals.concat(where.values)
        }

        if (orderBy !== null) {
            q += orderBy.sql
        }

        console.log(q)
        return query(q, literals)
    }
}
