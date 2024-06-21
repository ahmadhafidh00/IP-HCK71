const axios = require("axios");
const { Movie, MyMovie } = require("../models");

module.exports = class MovieController {
  static async Home(req, res, next) {
    try {
      let result = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        // params: {
        //   api_key: process.env.TMDB_API_KEY,
        // },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      });
      // olah data tmdb sebelum di kirim sebagai response
      const data = result.data.results.map((movie) => {
        return {
          id: "tmdb-" + movie.id,
          title: movie.title,
          synopsis: movie.overview,
          releaseDate: movie.release_date,
          coverUrl: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          rating: movie.vote_average,
          isNowShowing: false,
        };
      });

      // console.log(data);
      // create movie in our database
      data.forEach(async (movie) => {
        await Movie.findOrCreate({
          where: {
            id: movie.id,
          },
          defaults: {
            id: movie.id,
            title: movie.title,
            synopsis: movie.synopsis,
            releaseDate: movie.releaseDate,
            coverUrl: movie.coverUrl,
            rating: movie.rating,
            isNowShowing: movie.isNowShowing,
          },
        });
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createMyMovies(req, res, next) {
    try {
      let UserId = req.user.id;
      let MovieId = req.params.movieId;

      // ??? berarti butuh buat model baru kah? MyMovies
      const movie = await Movie.findByPk(MovieId);
      if (!movie) {
        throw { name: "NotFound", message: "Movie not found" };
      }

      const mymovies = await MyMovie.create({
        UserId,
        MovieId,
      });

      res.status(201).json(mymovies);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMyMovies(req, res, next) {
    try {
      const mymovies = await MyMovie.findAll({
        where: { UserId: req.user.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Movie,
          attributes: {
            exclude: ["duration", "createdAt", "updatedAt"],
          },
        },
      });

      res.status(200).json(mymovies);
    } catch (error) {
      next(error);
    }
  }

  static async updateMyMoviesById(req, res, next) {
    try {
      const { isNowShowing } = req.body;
      const id = req.params.id;

      if (!isNowShowing) {
        throw { name: "InvalidInput", message: "isNowShowing cannot be empty" };
      }

      const movie = await MyMovie.findByPk(id);
      if (!movie) {
        throw { name: "NotFound", message: "Movie not found" };
      }

      await movie.update({ isNowShowing });

      res.status(200).json({ message: "Movie has been updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyMoviesById(req, res, next) {
    try {
      const id = req.params.id;

      const movie = await MyMovie.findByPk(id);
      if (!movie) {
        throw { name: "NotFound", message: "Movie not found" };
      }

      await movie.destroy();

      res.status(200).json({ message: "Movie has been deleted" });
    } catch (error) {
      next(error);
    }
  }
};
