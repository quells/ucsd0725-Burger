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
    selectAll: function(tableName, options) {
        if (tableName === undefined) { return Promise.reject("invalid table name") }

        options = options || {}
        var literals = []

        var q = `SELECT * FROM ${tableName}`
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
    },
    insertOne: function(tableName, obj) {
        if (tableName === undefined) { return Promise.reject("invalid table name") }
        if (obj === undefined) { return Promise.reject("invalid object") }

        var columns = Object.keys(obj).join(", ")
        var literals = Object.keys(obj).map(k => obj[k])
        var valuePlaceholders = literals.map(v => "?").join(", ")

        var q = `INSERT INTO ${tableName} (${columns}) VALUE (${valuePlaceholders})`

        console.log(q)
        return query(q, literals)
    },
    updateOne: function(tableName, values, options) {
        if (tableName === undefined) { return Promise.reject("invalid table name") }
        if (values === undefined) { return Promise.reject("invalid values") }

        var columns = Object.keys(values).map(k => `${k} = ?`).join(", ")
        var literals = Object.keys(values).map(k => values[k])

        var q = `UPDATE ${tableName} SET ${columns}`
        var where = parseWhere(options.where)

        if (where === null) {
            return Promise.reject("invalid options")
        }

        q += where.sql
        literals = literals.concat(where.values)

        console.log(q)
        return query(q, literals)
    },
    delete: function(tableName, options) {
        if (tableName === undefined) { return Promise.reject("invalid table name") }

        options = options || {}
        var literals = []

        var q = `DELETE FROM ${tableName}`
        var where = parseWhere(options.where)

        if (where !== null) {
            q += where.sql
            literals = literals.concat(where.values)
        }

        console.log(q, literals)
        return query(q, literals)
    }
}
