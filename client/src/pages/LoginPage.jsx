import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: { email, password },
      });
      localStorage.setItem("token", data.access_token);

      navigate("/");
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
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div
          className="border border-1 form-outline mb-5"
          style={{ width: "18rem" }}
        >
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>
        {/* Password input */}
        <div className="border border-1 form-outline mb-5">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>
        {/* Submit button */}
        <button
          type="submit" // type nya harus submit, bukan button
          data-mdb-button-init=""
          data-mdb-ripple-init=""
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>
        {/* Register buttons */}
        <div className="text-center">
          <p>or sign up with:</p>
          <button
            type="button"
            data-mdb-button-init=""
            data-mdb-ripple-init=""
            className="btn btn-link btn-floating mx-1"
          >
            <i className="fab fa-google" />
          </button>
        </div>
      </form>
    </div>
  );
}
