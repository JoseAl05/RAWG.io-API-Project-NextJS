const express = require("express");
const routes = require("../routes/index");
const csrf = require("csurf");
const path = require("path");
const morgan = require("morgan");
const setUpSession = require("../lib/sessions");
const setUpPassport = require("../lib/passport");
const setUpCors = require("../lib/cors");
const passport = require('passport');

const app = express();

require("dotenv").config();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

setUpCors(app);

setUpSession(app);

app.use(
  csrf({
    cookie: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
setUpPassport();

app.use("/api", routes);

module.exports = app;
