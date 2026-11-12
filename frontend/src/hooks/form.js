import { useReducer, useRef } from "react";

function reduktorForme(stanje, akcija) {
  switch (akcija.tip) {
    case "PROMENA":
      return {
        ...stanje,
        podaci: akcija.podaci,
        greske_validacije: akcija.greske,
        greska_nakon_slanja: null,
        blokirano: Object.values(akcija.greske).some(Boolean),
      };
    case "VALIDACIJA":
      return {
        ...stanje,
        greske_validacije: akcija.greske,
        blokirano: Object.values(akcija.greske).some(Boolean),
      };
    case "SLANJE":
      return { ...stanje, status: "slanje", blokirano: true,
        greska_nakon_slanja: null };
    case "USPEH":
      return { ...stanje, status: "poslato", blokirano: false };
    case "GRESKA":
      return { ...stanje, status: "greska", blokirano: false,
        greska_nakon_slanja: akcija.poruka };
    default:
      return stanje;
  }
}

export function useForm(podaci, validiraj, posalji, zavrsi) {
  const slanje = useRef(false);
  const [stanje, dispatch] = useReducer(reduktorForme, {
    podaci: { ...podaci },
    status: "spremno",
    greske_validacije: {},
    greska_nakon_slanja: null,
    blokirano: false,
  });
  const proveriSve = (vrednosti) => Object.fromEntries(
    Object.entries(validiraj).map(([polje, proveri]) =>
      [polje, proveri(vrednosti[polje], vrednosti)]),
  );
  const promeni = (e) => {
    if (slanje.current) return;
    const { name, value } = e.target;
    const noviPodaci = { ...stanje.podaci, [name]: value };
    const sveGreske = proveriSve(noviPodaci);
    const polja = Object.keys({ ...stanje.greske_validacije, [name]: "" });
    const greske = Object.fromEntries(polja.map(polje => [polje, sveGreske[polje]]));
    dispatch({ tip: "PROMENA", podaci: noviPodaci, greske });
  };
  const izvrsi = async (e) => {
    e.preventDefault();
    if (slanje.current) return;
    const greske = proveriSve(stanje.podaci);
    dispatch({ tip: "VALIDACIJA", greske });
    if (Object.values(greske).some(Boolean)) return;
    slanje.current = true;
    dispatch({ tip: "SLANJE" });
    try {
      const rezultat = await posalji(stanje.podaci);
      dispatch({ tip: "USPEH" });
      zavrsi(rezultat);
    } catch (err) {
      dispatch({ tip: "GRESKA", poruka: err.message });
    } finally {
      slanje.current = false;
    }
  };
  return { stanje, promeni, izvrsi };
}
