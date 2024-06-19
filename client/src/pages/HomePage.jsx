import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    setLoading("Loading...");
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data);
      setMovies(data);
    } catch (error) {
      console.log(error.response?.data.message);
      Swal.fire({
        title: "Error!",
        text: error.response?.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ height: "100vh" }}
      >
        <h3 className="text-secondary">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center flex-wrap gap-3 pt-5">
      {movies.map((m) => {
        return <MovieCard key={m.id} movies={m} />;
      })}
    </div>
  );
}
