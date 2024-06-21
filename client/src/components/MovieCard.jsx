import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movies }) {
  const navigate = useNavigate();

  const handleOnAdd = async () => {
    try {
      // 1. example we are using axios to get to step 3 endpoint.
      //    -> example endpoint we created earlier is app.get('/payment/token')
      //    -> so we will call that endpoint to get the token
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/payment/token",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // 2. then we will use the token to open pop up snap payment
      window.snap.pay(data.transactionToken, {
        // on success we have to update the data
        onSuccess: async function (result) {
          alert("payment success!");
          // console.log(result);

          // 3. ketika pembayaran berhasil -> tambahin movie ke /mymovies pake axios
          await axios({
            method: "POST",
            url: `http://localhost:3000/mymovies/${movies.id}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          navigate("/mymovies");
        },
      });
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
        <img src={movies.coverUrl} className="img-fluid" />
        <div
          className="mask"
          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{movies.title}</h5>
        <p className="card-text text-truncate">{movies.synopsis}</p>
        <div className="d-grid col-10 mx-auto">
          <button
            onClick={handleOnAdd}
            className="btn btn-success hover:cursor-pointer"
          >
            Add Movies
          </button>
        </div>
      </div>
    </div>
    // <div className="row row-cols-1 row-cols-md-2 g-4 pt-5">
    //   <div className="col" style={{ width: "18rem" }}>
    //     <div className="card">
    //       <img
    //         src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
    //         className="card-img-top"
    //         alt="Los Angeles Skyscrapers"
    //       />
    //       <div className="card-body">
    //         <h5 className="card-title">Card title</h5>
    //         <p className="card-text">
    //           This is a longer card with supporting text below as a natural
    //           lead-in to additional content.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
