const pgPromise = require("pg-promise");
const { Recipes } = require("./repos");

const initOptions = {
    extend(obj) {
        obj.recipes = new Recipes(obj, pgp);
    },
};

const pgp = pgPromise(initOptions);

const db = pgp("postgres://root:secret@db:5432/recipes");

const initDB = async () => {
    try {
        await db.recipes.create();
    } catch (er) {
        console.log(er);
    }

    return { db, pgp };
};

module.exports = { initDB };
