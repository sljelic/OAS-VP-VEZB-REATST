import { useContext } from "react";
import { KorisnikContext } from "./korisnik.js";
export function useKorisnik() {
  const kontekst = useContext(KorisnikContext);
  if (!kontekst) throw new Error("Недостаје KorisnikProvider.");
  return kontekst;
}
