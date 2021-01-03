const pgPromise = require("pg-promise");
const { Recipes } = require("./repos");

const waitPort = require("wait-port");

const initOptions = {
    extend(obj) {
        obj.recipes = new Recipes(obj, pgp);
    },
};

const pgp = pgPromise(initOptions);

const db = pgp("postgres://root:secret@db:5432/recipes");

const initDB = async () => {
    try {
        await waitPort({ host: "db", port: 5432 });
        await db.recipes.create();
    } catch (er) {
        console.log(er);
    }

    return { db, pgp };
};

module.exports = { initDB };
