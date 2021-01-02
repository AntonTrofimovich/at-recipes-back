const { recipes: sql } = require("../sql");

class RecipesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    async create() {
        return this.db.none(sql.create);
    }

    async add(data) {
        return this.db.one(sql.add, {
            title: data.title,
            description: data.description,
        });
    }

    async update(data) {
        return this.db.one(sql.update, {
            title: data.title,
            description: data.description,
            id: data.id,
        });
    }

    async remove(id) {
        return this.db.result(sql.delete, { id }, (r) => r.rowCount);
    }

    async find(data) {
        return this.db.oneOrNone(sql.find, {
            id: +data.id,
        });
    }

    async all() {
        return this.db.any("SELECT * FROM recipes");
    }
}

module.exports = RecipesRepository;
