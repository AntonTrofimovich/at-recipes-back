const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}));

app.get("/anton", (req, res) => res.send("Anton"))

app.listen(3000, () =>
    console.log('listening on 3000')
)