import { useCallback } from "react";

export const validate = (naziv_polja, obaveznost, regex_pravila, provere) => {
  const daLiJePrazno = (vrednost) => {
    return vrednost == null || String(vrednost).trim() === ""
      ? `Поље ${naziv_polja} је обавезно.`
      : "";
  };

  const daLiZadovoljavaRegExe = (vrednost) => {
    // proveri regularne izraze
    for (const { reg_izraz, poruka } of regex_pravila) {
      if (!reg_izraz.test(vrednost)) return poruka;
    }
    return "";
  };

  const daLiZadovoljavaProvere = (vrednost) => {
    // proveri pravila, gde pravila mogu biti funkcije koje vraćaju true/false
    for (const { f, poruka } of provere) {
      if (!f(vrednost)) return poruka;
    }
    return "";
  };

  const validate = (vrednost) => {
    const prazno = daLiJePrazno(vrednost);
    if (prazno) return obaveznost ? prazno : "";
    const regExPoruka = daLiZadovoljavaRegExe(vrednost);
    if (regExPoruka) return regExPoruka;
    const pravilaPoruka = daLiZadovoljavaProvere(vrednost);
    if (pravilaPoruka) return pravilaPoruka;
    return "";
  };

  return validate;
};

export const useValidate = (
  naziv_polja,
  obaveznost,
  regex_pravila,
  provere,
) => {
  return useCallback(
    (vrednost) => {
      const daLiJePrazno = (vrednost) => {
        return vrednost == null || String(vrednost).trim() === ""
          ? `Поље ${naziv_polja} је обавезно.`
          : "";
      };

      const daLiZadovoljavaRegExe = (vrednost) => {
        // proveri regularne izraze
        for (const { reg_izraz, poruka } of regex_pravila) {
          if (!reg_izraz.test(vrednost)) return poruka;
        }
        return "";
      };

      const daLiZadovoljavaProvere = (vrednost) => {
        // proveri pravila, gde pravila mogu biti funkcije koje vraćaju true/false
        for (const { f, poruka } of provere) {
          if (!f(vrednost)) return poruka;
        }
        return "";
      };
      const prazno = daLiJePrazno(vrednost);
      if (prazno) return obaveznost ? prazno : "";
      const regExPoruka = daLiZadovoljavaRegExe(vrednost);
      if (regExPoruka) return regExPoruka;
      const pravilaPoruka = daLiZadovoljavaProvere(vrednost);
      if (pravilaPoruka) return pravilaPoruka;
      return "";
    },
    [obaveznost, naziv_polja, regex_pravila, provere],
  );
};
