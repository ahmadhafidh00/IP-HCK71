const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const PaymentController = require("../controllers/PaymentController");

// users endpoints -> login pake google o-auth
router.post("/login", UserController.login);

router.use(authentication);

// Home / -> nampilin list movie TMDB
router.get("/", MovieController.Home);

// midtrans
// router.patch("/users/me/upgrade", UserController.upgradeAccount);
router.get("/payment/token", PaymentController.getMidtransToken);

// my-movies endpoints
router.post("/mymovies/:movieId", MovieController.createMyMovies);
router.get("/mymovies", MovieController.getAllMyMovies);
router.put("/mymovies/:id", MovieController.updateMyMoviesById);
router.delete("/mymovies/:id", MovieController.deleteMyMoviesById);

module.exports = router;
