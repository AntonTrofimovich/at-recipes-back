const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { db } = require("./db");

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200, // For legacy browser support
    })
);
app.use(bodyParser.json());

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

GET("/recipes/all", () => db.recipes.all());

POST("/recipes/add", (req) => {
    return db.task("add-recipe", (t) => t.recipes.add(req.body));
});

app.listen(3000, () => console.log("listening on 3000"));
