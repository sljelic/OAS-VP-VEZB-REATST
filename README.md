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
| Zadatak 1.5.2 | `src/tests/Registracija.test.jsx` | `zad:test-registracija` |

Numeracija odgovara aktuelnoj zbirci: poglavlje „Klijentsko veb programiranje” je prvo aktivno poglavlje, a testiranje peta sekcija. Prethodna poglavlja su trenutno komentarisana u glavnom LaTeX izvoru.

Testovi komponenti koriste React Testing Library i jest-dom. Stvarni pružalac konteksta i MemoryRouter daju komponenti isto okruženje koje zahteva u aplikaciji. Test prijave pretražuje polje preko uloge i njegovog pristupačnog naziva.

Test registracije koristi stvarne forme, kontekst i dve rute u MemoryRouter-u. Samo servis je zamenjen funkcijom `jest.fn()`. Proveravaju se elementi forme, uspešan prelazak na prijavu, prazni podaci, nepodudarne lozinke i greška servisa. Svaki test dobija nov prikaz, dok `clearMocks` briše prethodne pozive servisne zamene.

Pri proveri su popravljeni povezivanje kontrolisanih polja sa `stanje.podaci`, ponovno računanje validacije, provera pre slanja i podudaranje lozinki. U prijavi je uklonjen duplirani argument za `useForm` i prikazuje se poruka prosleđena sa registracije. Servis registracije sada čuva heš u skladu sa servisom prijave. Početna ruta daje prijavljenom korisniku odredište i odjavu, bez kružnog preusmeravanja.

Jest i RTL testovi se izvršavaju u Node/jsdom okruženju. Pozivanje stvarnog servisa posebno je provereno registracijom novog naloga i prijavom njegovom lozinkom. Kod je usklađen sa listingom u zbirci. Izveštaj pokrivenosti iz `coverage/` ne ulazi u komite.
