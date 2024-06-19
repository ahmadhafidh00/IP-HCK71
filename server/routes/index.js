const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");

// users endpoints -> login pake google o-auth
router.post("/login", UserController.login);

router.use(authentication);

// Home / -> nampilin list movie TMDB
router.get("/", MovieController.Home);

// my-movies endpoints
// midtrans
// router.post("/mymovies/:id");
// router.get("/mymovies");
// router.put("/mymovies/:id");
// router.delete("/mymovies/:id");

module.exports = router;
