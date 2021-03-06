var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var restaurantRouter = require("./routes/restaurant");
var noticeRouter = require("./routes/notice");
var scheduleRouter = require("./routes/schedule");
var errorRouter = require("./routes/error");
var allowRouter = require("./routes/allow");
var userRouter = require("./routes/user")

const cors = require("cors");
var app = express();

app.use(cors()); // config 추가

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/restaurant", restaurantRouter);
app.use("/notice", noticeRouter);
app.use("/schedule", scheduleRouter);
app.use("/error", errorRouter);
app.use("/allow", allowRouter);
app.use("/user", userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
