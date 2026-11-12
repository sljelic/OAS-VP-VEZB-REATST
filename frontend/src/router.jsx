import { createBrowserRouter, Navigate } from "react-router-dom";
import Pocetna from "./components/Korisnik/Pocetna.jsx";
import Prijava from "./components/Korisnik/Prijava.jsx";
import Registracija from "./components/Korisnik/Registracija.jsx";
export const router = createBrowserRouter([
  { path: "/", element: <Pocetna /> },
  { path: "/prijava", element: <Prijava /> },
  { path: "/registracija", element: <Registracija /> },

  { path: "*", element: <Navigate to="/prijava" replace /> },
]);
