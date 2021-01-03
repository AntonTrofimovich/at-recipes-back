const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { db } = require("./db");

const app = express();

const requestHandler = async (req, res, handler) => {
    try {
        const data = await handler(req);
        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message || error,
        });
    }
};

const GET = (url, handler) => {
    app.get(url, (req, res) => requestHandler(req, res, handler));
};

const POST = (url, handler) => {
    app.post(url, (req, res) => requestHandler(req, res, handler));
};

const DELETE = (url, handler) => {
    app.delete(url, (req, res) => requestHandler(req, res, handler));
};

app.use(
    cors({
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200, // For legacy browser support
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

GET("/recipes/all", () => db.recipes.all());

POST("/recipes/save", (req) => {
    return db.task("add-recipe", async (t) => {
        const { id } = req.body;

        if (!id) {
            return t.recipes.add(req.body);
        }

        return t.recipes.update(req.body);
    });
});
DELETE("/recipes/delete/:id", (req) => {
    return db.task("delete-recipe", async (t) => {
        const { id } = req.params;
        await t.recipes.remove(id);

        return id;
    });
});

app.listen(3000, () => console.log("listening on 3000"));
