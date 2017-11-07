function devourBurger(id) {
    $.ajax({
        method: "PUT",
        url: "/api/burger/devour/" + id,
        success: function(response) {
            if (response === "OK") {
                location.reload()
            } else {
                console.error(response)
            }
        },
        error: function(err) {
            console.error(err)
        }
    })
}

function clearDevouredBurgers() {
    $.ajax({
        method: "DELETE",
        url: "/api/burger/clear/devoured",
        success: function(response) {
            if (response === "OK") {
                location.reload()
            } else {
                console.error(response)
            }
        },
        error: function(err) {
            console.error(err)
        }
    })
}