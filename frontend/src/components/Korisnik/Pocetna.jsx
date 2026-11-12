import { Button, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useKorisnik } from "../../context/useKorisnik.js";

export default function Pocetna() {
  const { korisnik, odjava } = useKorisnik();
  if (!korisnik) return <Navigate to="/prijava" replace />;
  return <Container className="py-4">
    <h1>Почетна страница</h1>
    <p>{korisnik.ime} {korisnik.prezime}</p>
    <Button onClick={odjava}>Одјави се</Button>
  </Container>;
}
