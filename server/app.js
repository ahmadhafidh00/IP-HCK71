require("dotenv").config();

const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const cors = require("cors");

// middleware body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// endpoints
app.use(router);

// middlewares error handler
app.use(errorHandler);

module.exports = app;
