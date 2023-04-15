const express = require("express");
const format = require("date-format");

const app = express();

const PORT = 4000 || process.env.PORT;

app.get("/", (request, response) => {
    // response.send('<h1>Hello Sunny</h1>')
    response.status(200).send("<h1>Hello Sunny</h1>");
});

app.get("/api/v1/instagram", (req, res) => {
    const instaSocial = {
        userName: "sunny8080",
        followers: 25,
        follows: 80,
        date: format("dd-MM-yy hh:mm:ss", new Date()),
    };
    res.status(200).json(instaSocial);
});

app.get("/api/v1/linkedin", (req, res) => {
    const lnkdSocial = {
        userName: "sunny8080",
        followers: 100,
        follows: 150,
        date: format("dd-MM-yy hh:mm:ss", new Date()),
    };
    res.status(200).json(lnkdSocial);
});

app.get("/api/v1/:token", (req, res) => {
    console.log(req.params.token);
    res.status(200).json({ param: req.params.token });
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
