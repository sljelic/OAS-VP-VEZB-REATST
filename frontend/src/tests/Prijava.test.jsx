import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Prijava from "../components/Korisnik/Prijava.jsx";
import { KorisnikProvider } from "../context/KorisnikContext.jsx";

test("пријава приказује означено поље за имејл", () => {
  render(
    <KorisnikProvider>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Prijava />
      </MemoryRouter>
    </KorisnikProvider>,
  );

  const imejl = screen.getByRole("textbox", { name: "Имејл адреса" });
  expect(imejl).toBeInTheDocument();
  expect(imejl).toHaveAttribute("type", "email");
  expect(imejl).toHaveAttribute("name", "email");
  expect(imejl).toHaveValue("");
});
