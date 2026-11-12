import { useCallback } from "react";
import { Alert, Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useKorisnik } from "../../context/useKorisnik.js";
import { useForm } from "../../hooks/form.js";
import { prijava } from "../../services/korisnik.js";
import { proveriImejl, proveriLozinku } from "../../validations/korisnik.js";

export default function Prijava() {
  const { korisnik, postaviKorisnika } = useKorisnik();
  const navigate = useNavigate();

  const { stanje, promeni, izvrsi } = useForm(
    { email: "", lozinka: "" },
    // callback koji se poziva kada se forma validira
    {
      email: proveriImejl,
      lozinka: proveriLozinku,
    },
    // callback koji se poziva kada se forma šalje
    useCallback(async ({ email, lozinka }) => {
      return await prijava({
        email: email.trim().toLowerCase(),
        lozinka: lozinka.trim(),
      });
    }, []),
    // callback koji se poziva kada se forma šalje
    useCallback(async ({ email, lozinka }) => {
      return await prijava({
        email: email.trim().toLowerCase(),
        lozinka: lozinka.trim(),
      });
    }, []),
    // callback koji se poziva kada je forma uspešno poslata
    useCallback(
      (k) => {
        postaviKorisnika(k);
        navigate("/", { replace: true });
      },
      [postaviKorisnika, navigate],
    ),
  );

  if (korisnik) return <Navigate to="/" replace />;
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <h1>Пријава</h1>
          {stanje.status === "greska" && (
            <Alert variant="danger">{stanje.greska_nakon_slanja}</Alert>
          )}

          <Form noValidate onSubmit={izvrsi}>
            <Form.Group key="email" className="mb-3" controlId="email">
              <Form.Label>Имејл адреса</Form.Label>
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

            <Form.Group key="lozinka" className="mb-3" controlId="lozinka">
              <Form.Label>Лозинка</Form.Label>
              <Form.Control
                name="lozinka"
                type="password"
                autoComplete="current-password"
                value={stanje.lozinka}
                onChange={promeni}
                isInvalid={Boolean(stanje.greske_validacije.lozinka)}
              />
              <Form.Control.Feedback type="invalid">
                {stanje.greske_validacije.lozinka}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={stanje.blokirano}>
              Пријави се
            </Button>
          </Form>
          <Nav className="mt-3">
            <Nav.Link as={Link} to="/registracija">
              Регистрација
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}
