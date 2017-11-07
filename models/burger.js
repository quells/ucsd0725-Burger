const orm = require("../config/orm")

module.exports = {
    getAll: function() {
        return orm.selectAll("burgers")
        .then(results => results.map(r => {
            // convert 0/1 to false/true
            r.devoured = (r.devoured === 1)
            return r
        }))
    },
    createNew: function(name) {
        return orm.insertOne("burgers", {
            burger_name: name,
            created_at: new Date()
        })
    },
    devour: function(id) {
        return orm.updateOne("burgers", 
            { devoured: true },
            { where: { id: id } }
        )
    }
}