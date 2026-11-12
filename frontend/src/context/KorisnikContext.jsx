import { useCallback, useMemo, useReducer } from "react";
import { KorisnikContext } from "./korisnik.js";
function reducer(korisnik, akcija) {
  switch (akcija.tip) {
    case "PRIJAVA":
      return akcija.korisnik;
    case "ODJAVA":
      return null;
    default:
      return korisnik;
  }
}
export function KorisnikProvider({ children }) {
  const [korisnik, dispatch] = useReducer(reducer, null);
  const postaviKorisnika = useCallback(
    (k) => dispatch({ tip: "PRIJAVA", korisnik: k }),
    [],
  );
  const odjava = useCallback(() => dispatch({ tip: "ODJAVA" }), []);
  const vrednost = useMemo(
    () => ({ korisnik, postaviKorisnika, odjava }),
    [korisnik, postaviKorisnika, odjava],
  );
  return (
    <KorisnikContext.Provider value={vrednost}>
      {children}
    </KorisnikContext.Provider>
  );
}
