import { useCallback, useReducer } from "react";

function reduktorForme(stanje, akcija) {
  switch (akcija.tip) {
    case "PROMENA":
      return {
        ...stanje,
        // ako je akcija: PROMENA, onda se stanje forme menja tako da se polje koje je poslato u akciji ažurira sa novom vrednošću, a ostala polja ostaju nepromenjena
        podaci: { ...stanje.podaci, [akcija.polje]: akcija.vrednost },
        // takođe se ažurira stanje grešaka validacije tako da se polje koje je poslato u akciji ažurira sa novom greškom validacije, a ostala polja ostaju nepromenjena
        greske_validacije: {
          ...stanje.greske_validacije,
          [akcija.polje]: akcija.validacija,
        },
        // ako je akcija: PROMENA, onda greške nakon slanja forme se brišu, jer se forma menja i greške nakon slanja više nisu relevantne
        greska_nakon_slanja: null,
        // takođe se postavlja da je forma promenjena
        promenjeno: true,
        // indikator da li je forma blokirana se postavlja na vrednost iz akcije, što omogućava da se forma blokira ili otključa u zavisnosti od ispravnosti unetih podataka
        blokirano: akcija.blokirano,
      };
    case "SLANJE":
      return {
        ...stanje,
        // ako je akcija: SLANJE, onda se stanje forme menja tako da se status forme postavlja na "slanje"
        status: "slanje",
        // kada je forma u procesu slanja, blokira se forma da bi se sprečilo višestruko slanje
        blokirano: true,
      };
    case "USPEH":
      return {
        ...stanje,
        status: "poslato",
        blokirano: false,
      };
    case "GRESKA":
      return {
        ...stanje,
        status: "greska",
        greska_nakon_slanja: akcija.poruka,
        blokirano: false,
      };
    default:
      return stanje;
  }
}

export function useForm(podaci, validiraj, posalji, zavrsi) {
  const [stanje, dispatch] = useReducer(reduktorForme, {
    podaci: { ...podaci },
    status: "ucitavanje",
    greske_validacije: {},
    greska_nakon_slanja: null,
    blokirano: false,
  });

  const promeni = useCallback((e) => {
    dispatch({
      tip: "PROMENA",
      polje: e.target.name,
      vrednost: e.target.value,
      validacija: validiraj[e.target.name](e.target.value),
      blokirano: Object.values({
        ...stanje.greske_validacije,
        [e.target.name]: validiraj[e.target.name](e.target.value),
      }).some((v) => v !== ""),
    });
  }, []);

  const izvrsi = async (e) => {
    // sprečava podrazumevano ponašanje forme (npr. reload stranice)
    e.preventDefault();
    // otprema akciju slanja forme, što menja stanje u "slanje" i blokira formu
    dispatch({ tip: "SLANJE" });
    try {
      // poziva callback funkciju za slanje forme, koja je prosleđena kao argument priključku
      const rezultat = await posalji(stanje.podaci);
      // ako je slanje forme uspešno, otprema se akcija uspeha, što menja stanje u "spremno" i otključava formu
      dispatch({ tip: "USPEH" });
      // poziva se callback funkcija koja se izvršava nakon uspešnog slanja forme, koja je prosleđena kao argument priključku
      console.log("Završavam sa rezultatima:", rezultat);
      zavrsi(rezultat);
    } catch (err) {
      // ako je došlo do greške prilikom slanja forme, otprema se akcija greške, što menja stanje u "spremno", otključava formu i postavlja poruku o grešci
      dispatch({
        tip: "GRESKA",
        poruka: err.message,
      });
    }
  };
  return {
    stanje,
    promeni,
    izvrsi,
  };
}
