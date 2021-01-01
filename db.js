module.exports = () => {
    const pgp = require("pg-promise")();
    const db = pgp("postgres://root:secret@db:5432/recipes");

    db.on("SELECT $1 AS value", 123)
        .then(function (data) {
            console.log("DATA:", data.value);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });

    console.log("SADASDASDADADADAS")
}