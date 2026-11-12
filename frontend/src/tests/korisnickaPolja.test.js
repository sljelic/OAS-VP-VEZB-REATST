/** @jest-environment node */
import { describe, expect, test } from "@jest/globals";
import {
  proveriIme, proveriLozinku, proveriPrezime,
} from "../validations/korisnik.js";

const prazneVrednosti = [null, undefined, "", " ", "\t\n"];

describe.each([
  ["proveriIme", proveriIme, "име",
    "Име мора да почне словом и садржи између 2 и 40 знакова."],
  ["proveriPrezime", proveriPrezime, "презиме",
    "Презиме мора да почне словом и садржи између 2 и 40 знакова."],
])("%s", (_naziv, proveri, polje, poruka) => {
  test.each(prazneVrednosti)("одбија празну вредност %p", (vrednost) => {
    expect(proveri(vrednost)).toBe(`Поље ${polje} је обавезно.`);
  });

  test.each(["Ан", "Ana Marija", "Ana-Marija", "O'Neil",
    "A" + "b".repeat(39)])("прихвата %s", (vrednost) => {
    expect(proveri(vrednost)).toBe("");
  });

  test.each(["A", "A" + "b".repeat(40), "1Ana", "Ana_", " Ana"])(
    "одбија %s", (vrednost) => {
      expect(proveri(vrednost)).toBe(poruka);
    },
  );
});

describe("proveriLozinku", () => {
  test.each(prazneVrednosti)("одбија празну вредност %p", (vrednost) => {
    expect(proveriLozinku(vrednost)).toBe("Поље лозинка је обавезно.");
  });

  test.each(["Aa1aaaaa", "Жж123456", "Aa1" + "a".repeat(61)])(
    "прихвата исправну лозинку од %s", (vrednost) => {
      expect(proveriLozinku(vrednost)).toBe("");
    },
  );

  test.each(["Aa12345", "Aa1" + "a".repeat(62),
    "abcdefgh1", "ABCDEFGH1", "Abcdefgh"])(
    "одбија неисправну лозинку %s", (vrednost) => {
      expect(proveriLozinku(vrednost)).toBe(
        "Лозинка мора да садржи најмање једно велико слово, једно мало слово, један број, а да укупно садржи између 8 и 64 знака.",
      );
    },
  );
});
