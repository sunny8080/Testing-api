const express = require("express");
// const PORT = 4000 || process.env.PORT;
const PORT = process.env.PORT || 4000;
const app = express();

// swagger docs related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// const swaggerJsdoc = require("swagger-jsdoc");
// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Hello World",
//             version: "1.0.0",
//         },
//     },
//     apis: ["./src/routes*.js"], // files containing annotations as above
// };
// const swaggerSpec = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use(express.json());
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Learn Reactjs",
        price: 299,
    },
    {
        id: "22",
        name: "Learn Angular",
        price: 399,
    },
    {
        id: "33",
        name: "Learn Django",
        price: 499,
    },
];

app.get("/", (req, res) => {
    // res.send('<h1>Hello Sunny</h1>')
    // res.status(200).send("<h1>Hello Sunny</h1>");
    res.send("hello from Sunny");
});

app.get("/api/v1/lco", (req, res) => {
    res.send("hello from lco docs");
});

app.get("/api/v1/lcoobject", (req, res) => {
    res.send({ id: "55", name: "Learn Backend", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
    const myCourse = courses.find((course) => course.id === req.params.courseId);
    res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;

    res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    console.log(file);
    let path = __dirname + "/images/" + Date.now() + ".jpg";

    file.mv(path, (err) => {
        res.send(true);
    });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));



