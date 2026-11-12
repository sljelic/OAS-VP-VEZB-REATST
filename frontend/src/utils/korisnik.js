export async function hesirajLozinku(lozinka) {
  const bajtovi = new TextEncoder().encode(lozinka);
  const rezultat = await crypto.subtle.digest("SHA-256", bajtovi);
  return Array.from(new Uint8Array(rezultat), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
