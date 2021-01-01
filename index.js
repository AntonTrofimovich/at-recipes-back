const express = require("express");
const app = express();

const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200, // For legacy browser support
    })
);

const { db } = require("./db");
const GET = (url, handler) => {
    app.get(url, async (req, res) => {
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
    });
};

GET("/recipes/all", () => db.recipes.all());

app.listen(3000, () => console.log("listening on 3000"));
