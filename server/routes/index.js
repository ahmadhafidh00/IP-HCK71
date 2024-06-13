const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");

// Home / -> nampilin list movie TMDB
router.get("/", MovieController.Home);

// users endpoints -> login pake google o-auth
router.post("/login", UserController.login);

router.use(authentication);

// my-movies endpoints
// midtrans
// router.post("/my-movies");
// router.get("/my-movies");
// router.put("/my-movies");
// router.delete("/my-movies");

module.exports = router;
