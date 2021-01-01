const { recipes: sql } = require("../sql");

// const cs = {}; // Reusable ColumnSet objects.

class RecipesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        // createColumnSets(pgp);
    }

    // Creates the table;
    async create() {
        return this.db.none(sql.create);
    }

    // Drops the table;
    // async drop() {
    //     return this.db.none(sql.drop);
    // }

    // Removes all records from the table;
    // async empty() {
    //     return this.db.none(sql.empty);
    // }

    // Adds a new record and returns the full object;
    // It is also an example of mapping HTTP requests into query parameters;
    async add(values) {
        console.log(values);
        return this.db.one(sql.add, {
            title: values.title,
            description: values.description,
        });
    }

    // Tries to delete a product by id, and returns the number of records deleted;
    async remove(id) {
        return this.db.result(
            "DELETE FROM recipes WHERE id = $1",
            +id,
            (r) => r.rowCount
        );
    }

    // Tries to find a user product from user id + product name;
    async find(values) {
        return this.db.oneOrNone(sql.find, {
            recipeId: +values.recipeId,
        });
    }

    // Returns all product records;
    async all() {
        return this.db.any("SELECT * FROM recipes");
    }

    // Returns the total number of products;
    // async total() {
    //     return this.db.one(
    //         "SELECT count(*) FROM products",
    //         [],
    //         (a) => +a.count
    //     );
    // }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

// function createColumnSets(pgp) {
//     // create all ColumnSet objects only once:
//     if (!cs.insert) {
//         // Type TableName is useful when schema isn't default "public" ,
//         // otherwise you can just pass in a string for the table name.
//         const table = new pgp.helpers.TableName({
//             table: "recipes",
//             schema: "public",
//         });

//         cs.insert = new pgp.helpers.ColumnSet(["name"], { table });
//         cs.update = cs.insert.extend(["?id", "?user_id"]);
//     }

//     return cs;
// }

module.exports = RecipesRepository;
