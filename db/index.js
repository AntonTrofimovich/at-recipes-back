const pgPromise = require("pg-promise");
const { Recipes } = require("./repos");

const initOptions = {
    extend(obj) {
        obj.recipes = new Recipes(obj, pgp);
    },
};

const pgp = pgPromise(initOptions);

const db = pgp("postgres://root:secret@db:5432/recipes");

module.exports = { db, pgp };
