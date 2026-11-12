import { korisnici } from "../data/korisnici.js";
import { hesirajLozinku } from "../utils/korisnik.js";

const javniKorisnik = (k) => ({
  id: k.id,
  ime: k.ime,
  prezime: k.prezime,
  email: k.email,
  uloge: [...k.uloge],
});

export async function prijava({ email, lozinka }) {
  const nalog = korisnici.find((k) => k.email === email);
  let unesenaLozinka = await hesirajLozinku(lozinka);
  if (!nalog || nalog.lozinka !== unesenaLozinka)
    throw new Error("Погрешан имјел или лозинка.");
  return javniKorisnik(nalog);
}

export async function registracija({
  ime,
  prezime,
  email,
  lozinka,
  uloge = ["student"],
}) {
  const hes = await hesirajLozinku(lozinka);
  const zapis = {
    id: Math.max(0, ...korisnici.map((k) => k.id)) + 1,
    ime,
    prezime,
    email,
    lozinka: hes,
    uloge,
  };

  if (korisnici.some((k) => k.email === zapis.email))
    throw new Error(`Имејл адреса ${zapis.email} је већ регистрована.`);
  korisnici.push(zapis);
  return javniKorisnik(zapis);
}
