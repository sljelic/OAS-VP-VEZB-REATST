# Testiranje klijentske React aplikacije

Aplikacija sadrži forme za prijavu i registraciju. Testovi prate sekciju „Testiranje veb aplikacije na klijentskoj strani” zbirke [OAS-VP-ZBIRKA](https://github.com/sjelic/OAS-VP-ZBIRKA/tree/feat/react-fixes).

## Pokretanje

Potreban je Node.js 22 ili noviji.

```bash
cd frontend
npm ci
npm run dev
```

Aplikacija koristi adresu http://localhost:3000. Podaci su samo u memoriji klijenta.

## Testovi

```bash
cd frontend
npm test -- --runInBand
npm run test:watch
npm run test:coverage -- --runInBand
npm run lint
npm run build
```

Jest koristi Babel za ES module i JSX. Okruženje jsdom služi za testove komponenti, a zaglavlje `@jest-environment node` za čiste validacione funkcije. Testovi se nalaze u `frontend/src/tests`, odnosno `src/tests` u korenu klijentskog projekta. Svaki primer i zadatak ima zaseban komit.

| Komit | Datoteka | Labela u zbirci |
| --- | --- | --- |
| Primer 1.5.1 | `src/tests/proveriImejl.test.js` | `prim:test-imejl` |
| Zadatak 1.5.1 | `src/tests/korisnickaPolja.test.js` | `zad:test-polja` |
| Primer 1.5.2 | `src/tests/Prijava.test.jsx` | `prim:test-prijava` |

Numeracija odgovara aktuelnoj zbirci: poglavlje „Klijentsko veb programiranje” je prvo aktivno poglavlje, a testiranje peta sekcija. Prethodna poglavlja su trenutno komentarisana u glavnom LaTeX izvoru.

Testovi komponenti koriste React Testing Library i jest-dom. Stvarni pružalac konteksta i MemoryRouter daju komponenti isto okruženje koje zahteva u aplikaciji. Test prijave pretražuje polje preko uloge i njegovog pristupačnog naziva.
