require("dotenv").config();

const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// middleware body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// endpoints
app.use(router);

// middlewares error handler
app.use(errorHandler);

module.exports = app;
