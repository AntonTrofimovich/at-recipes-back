const { QueryFile } = require("pg-promise");
const { join: joinPath } = require("path");

const sql = (file) => {
    const fullPath = joinPath(__dirname, file); // generating full path;

    const options = {
        minify: true,
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
};

module.exports = {
    recipes: {
        create: sql("recipes/create.sql"),
        find: sql("recipes/find.sql"),
        add: sql("recipes/add.sql"),
        update: sql("recipes/update.sql"),
        delete: sql("recipes/delete.sql"),
        getAll: sql("recipes/get_all.sql"),
    },
};
