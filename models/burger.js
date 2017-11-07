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
        if (name === undefined) return Promise.reject("no burger name supplied")

        var burger = {
            burger_name: name,
            created_at: new Date()
        }
        if (name.length < 1) delete burger.burger_name

        return orm.insertOne("burgers", burger)
    },
    devour: function(id) {
        return orm.updateOne("burgers", 
            {
                devoured: true,
                devoured_at: new Date()
            },
            {
                where: { 
                    id: id 
                } 
            }
        )
    }
}