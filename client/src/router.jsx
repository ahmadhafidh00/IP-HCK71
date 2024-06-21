import { createBrowserRouter, Outlet, redirect } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyMoviesPage from "./pages/MyMoviesPage.jsx";

import Navbar from "./components/Navbar.jsx";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      {/* Posisi component halaman */}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      let token = localStorage.getItem("token");
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    // path: "/",
    element: <RootLayout />,
    loader: () => {
      let token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: (
          <>
            <HomePage />,
          </>
        ),
      },
      {
        path: "/mymovies",
        element: (
          <>
            <MyMoviesPage />,
          </>
        ),
      },
    ],
  },
]);

export default router;
