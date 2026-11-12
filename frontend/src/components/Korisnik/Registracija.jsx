import { useCallback } from "react";
import { Alert, Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useKorisnik } from "../../context/useKorisnik.js";
import { useForm } from "../../hooks/form.js";
import { registracija } from "../../services/korisnik.js";
import {
  proveriIme,
  proveriImejl,
  proveriLozinku,
  proveriPrezime,
} from "../../validations/korisnik.js";

export default function Registracija() {
  const { korisnik } = useKorisnik();
  const navigate = useNavigate();

  const { stanje, promeni, izvrsi } = useForm(
    // pocetno stanje
    {
      ime: "",
      prezime: "",
      email: "",
      lozinka: "",
      potvrdaLozinke: "",
    },
    // callback koji se poziva kada se forma validira
    {
      ime: proveriIme,
      prezime: proveriPrezime,
      email: proveriImejl,
      lozinka: proveriLozinku,
      potvrdaLozinke: proveriLozinku,
    },
    // callback koji se poziva kada se forma šalje
    useCallback(
      async ({ ime, prezime, email, lozinka }) =>
        registracija({
          ime: ime.trim(),
          prezime: prezime.trim(),
          email: email.trim().toLowerCase(),
          lozinka: lozinka.trim(),
        }),
      [],
    ),
    // callback koji se poziva kada je forma uspešno poslata
    useCallback(() => {
      navigate("/prijava", {
        replace: true,
        state: { poruka: "Регистрација је успешна. Пријавите се." },
      });
    }, [navigate]),
  );
  if (korisnik) return <Navigate to="/" replace />;
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <h1>Регистрација</h1>
          {stanje.greska_nakon_slanja && (
            <Alert variant="danger">{stanje.greska_nakon_slanja}</Alert>
          )}
          <Form noValidate onSubmit={izvrsi}>
            <Form.Group key="ime" controlId="ime" className="mb-3">
              <Form.Label>Име</Form.Label>
              <Form.Control
                name="ime"
                type="text"
                autoComplete="given-name"
                value={stanje.ime}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.ime)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.ime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group key="prezime" controlId="prezime" className="mb-3">
              <Form.Label>Презиме</Form.Label>
              <Form.Control
                name="prezime"
                type="text"
                autoComplete="family-name"
                value={stanje.prezime}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.prezime)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.prezime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group key="email" controlId="email" className="mb-3">
              <Form.Label>Имејл</Form.Label>
              <Form.Control
                name="email"
                type="email"
                autoComplete="username"
                value={stanje.email}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.email)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group key="lozinka" controlId="lozinka" className="mb-3">
              <Form.Label>Лозинка</Form.Label>
              <Form.Control
                name="lozinka"
                type="password"
                autoComplete="new-password"
                value={stanje.lozinka}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.lozinka)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.lozinka}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              key="potvrdaLozinke"
              controlId="potvrdaLozinke"
              className="mb-3"
            >
              <Form.Label>Потврда лозинке</Form.Label>
              <Form.Control
                name="potvrdaLozinke"
                type="password"
                autoComplete="new-password"
                value={stanje.potvrdaLozinke}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.potvrdaLozinke)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.potvrdaLozinke}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={stanje.blokirano}>
              Региструј се
            </Button>
          </Form>
          <Nav className="mt-3">
            <Nav.Link as={Link} to="/prijava">
              Пријава
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}
