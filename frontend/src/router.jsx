import { createBrowserRouter, Navigate } from "react-router-dom";
import Prijava from "./components/Korisnik/Prijava.jsx";
import Registracija from "./components/Korisnik/Registracija.jsx";
export const router = createBrowserRouter([
  { path: "/prijava", element: <Prijava /> },
  { path: "/registracija", element: <Registracija /> },

  { path: "*", element: <Navigate to="/prijava" replace /> },
]);
