import { beforeEach, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Prijava from "../components/Korisnik/Prijava.jsx";
import Registracija from "../components/Korisnik/Registracija.jsx";
import { KorisnikProvider } from "../context/KorisnikContext.jsx";
import { registracija } from "../services/korisnik.js";

jest.mock("../services/korisnik.js", () => ({
  prijava: jest.fn(),
  registracija: jest.fn(),
}));

const podaci = {
  ime: "Ana", prezime: "Anić", email: "ana.nova@example.test",
  lozinka: "NovaLozinka1!",
};
const nalog = {
  id: 4, ime: podaci.ime, prezime: podaci.prezime,
  email: podaci.email, uloge: ["student"],
};

beforeEach(() => registracija.mockResolvedValue(nalog));

function pripremi() {
  const user = userEvent.setup();
  render(
    <KorisnikProvider>
      <MemoryRouter initialEntries={["/registracija"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/prijava" element={<Prijava />} />
        </Routes>
      </MemoryRouter>
    </KorisnikProvider>,
  );
  return user;
}

async function popuni(user, potvrda = podaci.lozinka) {
  await user.type(screen.getByRole("textbox", { name: "Име" }), podaci.ime);
  await user.type(screen.getByRole("textbox", { name: "Презиме" }), podaci.prezime);
  await user.type(screen.getByRole("textbox", { name: "Имејл" }), podaci.email);
  await user.type(screen.getByLabelText("Лозинка"), podaci.lozinka);
  await user.type(screen.getByLabelText("Потврда лозинке"), potvrda);
}

test("регистрација приказује сва поља, дугме и везу за пријаву", () => {
  pripremi();
  expect(screen.getByRole("heading", { name: "Регистрација" })).toBeInTheDocument();
  for (const name of ["Име", "Презиме", "Имејл"]) {
    expect(screen.getByRole("textbox", { name })).toHaveValue("");
  }
  expect(screen.getByLabelText("Лозинка")).toHaveAttribute("type", "password");
  expect(screen.getByLabelText("Потврда лозинке")).toHaveAttribute("type", "password");
  expect(screen.getByRole("button", { name: "Региструј се" })).toBeEnabled();
  expect(screen.getByRole("link", { name: "Пријава" })).toHaveAttribute("href", "/prijava");
});

test("успешна регистрација отвара стварну страницу пријаве", async () => {
  const user = pripremi();
  await popuni(user);
  await user.click(screen.getByRole("button", { name: "Региструј се" }));

  expect(await screen.findByRole("heading", { name: "Пријава" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Имејл адреса" })).toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent("Регистрација је успешна. Пријавите се.");
  expect(screen.queryByRole("heading", { name: "Регистрација" })).not.toBeInTheDocument();
  expect(registracija).toHaveBeenCalledTimes(1);
  expect(registracija).toHaveBeenCalledWith(podaci);
});

test("празна форма не позива сервис", async () => {
  const user = pripremi();
  await user.click(screen.getByRole("button", { name: "Региструј се" }));
  expect(await screen.findByText("Поље име је обавезно.")).toBeInTheDocument();
  expect(registracija).not.toHaveBeenCalled();
});

test("различите лозинке не позивају сервис", async () => {
  const user = pripremi();
  await popuni(user, "DrugaLozinka2!");
  await user.click(screen.getByRole("button", { name: "Региструј се" }));
  expect(await screen.findByText("Лозинке се не подударају.")).toBeInTheDocument();
  expect(registracija).not.toHaveBeenCalled();
});

test("грешка сервиса задржава форму и унете податке", async () => {
  registracija.mockRejectedValue(new Error("Имејл адреса је већ регистрована."));
  const user = pripremi();
  await popuni(user);
  await user.click(screen.getByRole("button", { name: "Региструј се" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Имејл адреса је већ регистрована.");
  expect(screen.getByRole("heading", { name: "Регистрација" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Имејл" })).toHaveValue(podaci.email);
  expect(screen.getByRole("button", { name: "Региструј се" })).toBeEnabled();
});
