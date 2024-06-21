import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MyMoviesCard from "../components/MyMoviesCard";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [myMovies, setMyMovies] = useState([]);

  const fetchMyMovies = async () => {
    setLoading("Loading...");
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/mymovies",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data);
      setMyMovies(data);
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
    fetchMyMovies();
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
      {myMovies.map((m) => {
        return (
          <MyMoviesCard key={m.id} myMovies={m} fetchMyMovies={fetchMyMovies} />
        );
      })}
    </div>
  );
}
