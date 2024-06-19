// import { useNavigate } from "react-router-dom";

export default function MovieCard({ movies }) {
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
        <h5 className="card-title">{movies.title}</h5>
        <p className="card-text">{movies.synopsis}</p>
        <div className="d-grid col-10 mx-auto">
          <button className="btn btn-success">Button</button>
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
