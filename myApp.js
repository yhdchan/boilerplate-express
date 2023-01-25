let express = require("express");
let bodyParser = require("body-parser");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ message: response });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", function (req, res) {
  res.send({ echo: req.params.word });
});

app.get("/name", function (req, res) {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.send({ name: `${firstname} ${lastname}` });
});

app.post("/name", function (req, res) {
  let name = `${req.body.first} ${req.body.last}`;
  res.json({ name });
});

module.exports = app;
