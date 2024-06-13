const axios = require("axios");

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
          isNowShowing: true,
        };
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
};
