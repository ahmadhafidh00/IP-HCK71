import axios from "axios";
import Swal from "sweetalert2";

export default function MovieCard({ myMovies, fetchMyMovies }) {
  // console.log(myMovies);
  const handleOnDelete = async () => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:3000/mymovies/" + myMovies.id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchMyMovies();
    } catch (error) {
      console.log(error.response?.data.message);
      Swal.fire({
        title: "Error!",
        text: error.response?.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div
        className="bg-image hover-overlay"
        data-mdb-ripple-init=""
        data-mdb-ripple-color="light"
      >
        <img src={myMovies.Movie.coverUrl} className="img-fluid" />
        <div
          className="mask"
          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{myMovies.Movie.title}</h5>
        <p className="card-text text-truncate">{myMovies.Movie.synopsis}</p>
        <div className="d-grid col-6 mx-auto gap-2">
          <button className="btn btn-success hover:cursor-pointer">
            Update
          </button>
          <button
            onClick={handleOnDelete}
            className="btn btn-danger hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
