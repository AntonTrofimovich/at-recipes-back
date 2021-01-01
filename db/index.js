const pgPromise = require("pg-promise");
const { Recipes } = require("./repos");

// pg-promise initialization options:
const initOptions = {
    extend(obj) {
        // Database Context (dc) is mainly useful when extending multiple databases with different access API-s.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.recipes = new Recipes(obj, pgp);
    },
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp("postgres://root:secret@db:5432/recipes");

// db.recipes.create();

// db.task("add-recipe", async (t) => {
//     const params = {
//         title: "Asd",
//         description: "Antont",
//     };
//     try {
//         return await t.recipes.add(params);
//     } catch (error) {
//         console.log(error);
//     }
// });

// db.recipes.all().then((a) => console.log(a));

module.exports = { db, pgp };
