import { validate } from "../hooks/validacije.js";

export const proveriImejl = validate(
  "имејл",
  true,
  [
    {
      reg_izraz: /^(?=.{1,120}$)[^\s@]+@[^\s@]+\.[^\s@]+$/,
      poruka: "Унесите исправну имејл адресу.",
    },
  ],
  [],
);

export const proveriLozinku = validate(
  "лозинка",
  true,
  [
    {
      reg_izraz:
        /^(?=[\s\S]*\p{Lu})(?=[\s\S]*\p{Ll})(?=[\s\S]*[0-9])[\s\S]{8,64}$/u,
      poruka:
        "Лозинка мора да садржи најмање једно велико слово, једно мало слово, један број, а да укупно садржи између 8 и 64 знака.",
    },
  ],
  [],
);

export const proveriIme = validate(
  "име",
  true,
  [
    {
      reg_izraz: /^\p{L}[\p{L} '-]{1,39}$/u,
      poruka: "Име мора да почне словом и садржи између 2 и 40 знакова.",
    },
  ],
  [],
);

export const proveriPrezime = validate(
  "презиме",
  true,
  [
    {
      reg_izraz: /^\p{L}[\p{L} '-]{1,39}$/u,
      poruka: "Презиме мора да почне словом и садржи између 2 и 40 знакова.",
    },
  ],
  [],
);
