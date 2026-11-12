/** @jest-environment node */
import { describe, expect, test } from "@jest/globals";
import { proveriImejl } from "../validations/korisnik.js";

describe("proveriImejl", () => {
  test.each([null, undefined, "", " ", "\t\n"])(
    "враћа поруку за празну вредност %p",
    (vrednost) => {
      expect(proveriImejl(vrednost)).toBe("Поље имејл је обавезно.");
    },
  );

  test.each(["ana@example.test", "ana+kurs@pod.example.test"])(
    "прихвата исправну адресу %s",
    (vrednost) => {
      expect(proveriImejl(vrednost)).toBe("");
    },
  );

  test.each([
    "ana.example.test", "ana@@example.test", "@example.test",
    "ana@example", "ana @example.test", " ana@example.test ",
  ])("одбија неисправну адресу %s", (vrednost) => {
    expect(proveriImejl(vrednost)).toBe("Унесите исправну имејл адресу.");
  });

  test("прихвата 120 знакова, а одбија 121 знак", () => {
    const adresa = "a".repeat(113) + "@b.test";
    expect(adresa).toHaveLength(120);
    expect(proveriImejl(adresa)).toBe("");
    expect(proveriImejl("a" + adresa)).toBe("Унесите исправну имејл адресу.");
  });
});
