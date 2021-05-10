// 1. Define API.
// 2. Turn on API.
// - Illustrate req, res, next
// - Define home route which handles data from home path.
// - Define other paths which can do other things.
// - Define error handler for when the path is not understood.
// - Define middleware for all paths.
// - Define middleware for one path.


// 1. Build an api
// 2. Turned on our api
// 3. Defined many routes that our API understands.
// 4. We defined variables in our routes and then extracted them for consumption in our handlers.
// 5. We learned how to grab URL parameters from the url
// 6. We know how to put a middle ware on all paths.
// 7. We know how to put a middleware on only one path.
// 8. . We learned how to handle errors.


// Anon function
// Regular Function
// Callback Function
// Middleware Function
// Handler Function

const express = require("express");
const port = 5000;

// Define an api
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const logger = require("morgan");
app.use(logger("dev"));

app.use((req, res, next) => {
  console.log("Middleware that runs on every URL/PATH/ACTION/REQUEST");
  next()
});

function middleWareThatWorksOnOnlyOnePath(req, res, next) {
  console.log("middleWareThatWorksOnOnlyOnePath");
  next();
}

app.get("/", middleWareThatWorksOnOnlyOnePath, function (req, res, next) {
  console.log("myHomePath");
  res.send("Thank you for coming to my home page!");
});

app.get("/send-something-back-to-browser", function (req, res) {
  res.send("Hello Thgere");
});

app.get("/movies", function (req, res) {
  res.send("Thank you for coming to my home page!");
});

app.get("/newsArticles", function (req, res) {
  res.send("Some Aritcles");
});

app.get("/blogposts", function (req, res) {
  res.send("Some posts");
});

app.get("/movies/:id/:person/:fruit/:bar?foo=bar&student=heheh", function (req, res) {
  console.log({
    query: req.query,
  });
  res.send("ID: " + req.params.id);
});


app.post('/', (req, res) => {
  res.send("you made a post request.");
})

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.statusCode = 404;
  next(error);
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500);
  res.send(err.message);
});


// app.use(function errorHandler(err, req, res, next) {
//   console.error(err);
//   res.status(err.statusCode || 500);
//   res.send(err.message);
// });

// function errorHandler(err, req, res, next) {
//   console.error(err);
//   res.status(err.statusCode || 500);
//   res.send(err.message);
// }

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
