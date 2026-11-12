# KVISKO — rešenja React vežbi

Aplikacija prati React sekcije zbirke [OAS-VP-ZBIRKA](https://github.com/sjelic/OAS-VP-ZBIRKA/tree/fd7e62d7bba41de43bbf050222e544a047e08caa). Numeracija `3.*` nastavlja četiri već postojeća komita u ovom repozitorijumu. Svaki sledeći primer i zadatak ima zaseban komit. Prva četiri komita nisu prepisivana.

## Pokretanje

Potreban je Node.js 22 ili noviji. U razvojnom kontejneru može da se koristi isti postupak.

```bash
cd frontend
npm ci
npm run dev
```

Aplikacija se otvara na http://localhost:3000.

## Probni nalozi

| Adresa | Lozinka | Uloga |
| --- | --- | --- |
| ana@example.test | Admin123! | administrator |
| marko@example.test | Nastava123! | nastavnik |
| iva@example.test | Student123! | student |

Prijava otvara predmete. Navigacija vodi na pitanja. Kartice i pitanja imaju veze za promenu i brisanje, a stranice spiskova dugmad za unos. Forme i dijalozi zadržavaju ponašanje iz zbirke, uključujući poništavanje i potvrdu brisanja. Javna registracija dodeljuje ulogu studenta.

Podaci i prijava postoje samo u memoriji klijenta. Osvežavanje stranice vraća početne nizove i odjavljuje korisnika. Ovo je simulacija servisnog sloja iz vežbi, bez serverske autentifikacije. Heševi lozinki ne ulaze u javni rezultat servisa ili kontekst.

## Provere

```bash
cd frontend
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Testovi proveravaju modele i slike, granice validacije, oba CRUD servisa, neispravan upis bez izmene niza, heševe i duplikate naloga. Integracioni DOM test prolazi kroz stvarne komponente: prijavu, unos/promenu/poništavanje/brisanje predmeta i pitanja, promenu indeksa tačne opcije, registraciju, fokus, odjavu i zaštitu ruta. Produkcioni build uključuje svih osam slika.

## Organizacija i usklađivanje sa zbirkom

- `src/data`: početni predmeti, pitanja, korisnici i dozvoljene uloge.
- `src/validations.js`: zajedničke provere i `imaGresaka`.
- `src/validations/`: pravila sa `obavezno` i `validacije`, kao i funkcije koje vraćaju poruke po poljima.
- `src/services/`: operacije nad istim klijentskim nizovima, uz asinhrone potpise iz zbirke.
- `src/components/`: postojeći prikazi, forme i dijalozi, kao i korisničke forme i kontrolna tabla.
- `src/context/` i `src/hooks/`: kontekst, reduktori i zajednička obrada formi/fokusa.

Servisi i komponente koriste jedinstveni sloj `validations.js` i `validations/*.js`, usklađen sa ispravljenim rešenjima zbirke. Sačuvan je i raniji alias `dohvatiSvaPitanja`, uz naziv `dohvatiSvePitanja` iz zbirke.

Operativne dopune ne menjaju ugovor vežbi:

- Za React 19 i Fast Refresh pružalac konteksta i `useKorisnik` nalaze se u odvojenim datotekama.
- Efekti primenjuju rezultate u asinhronim povratnim pozivima i odbacuju zakašnjele odgovore.
- Mapa DOM elemenata prenosi se kao ref objekat. `.current` se čita u efektu i menja u ref povratnom pozivu.
- Dodatne ugnježdene CRUD rute povezuju prethodne forme sa završnom kontrolnom tablom. Identifikatori iz URL-a pretvaraju se u brojeve i proveravaju.
- Početne putanje slika u modelima ostaju iste; `utils/slike.js` ih povezuje sa Vite asset modulima, pa rade i u produkcionom buildu. Fiksirane visine slike i opisa kartice ostaju 200px i 400px.

## Redosled komita i labele u zbirci

| Komit | Labela |
| --- | --- |
| Primer 3.1.1 | `prim:kvisko-1` |
| Zadatak 3.1.1 | `zad:kvisko-1` |
| Primer 3.2.1 | `prim:kvisko-2` |
| Zadatak 3.2.1 | `zad:kvisko-2` |
| Primer 3.2.2 | `prim:kvisko-3` |
| Zadatak 3.2.2 | `zad:kvisko-3` |
| Primer 3.2.3 | `prim:kvisko-4` |
| Zadatak 3.2.3 | `zad:kvisko-4` |
| Primer 3.2.4 | `prim:kvisko-5` |
| Zadatak 3.2.4 | `zad:kvisko-5` |
| Primer 3.2.5 | `prim:kvisko-6` |
| Zadatak 3.2.5 | `zad:kvisko-6` |
| Primer 3.3.1 | `prim:kvisko-7` |
| Zadatak 3.3.1 | `zad:kvisko-7` |
| Primer 3.3.2 | `prim:kvisko-8` |
| Zadatak 3.3.2 | `zad:kvisko-8` |
| Primer 3.3.3 | `prim:kvisko-9` |
| Zadatak 3.3.3 | `zad:kvisko-9` |
| Primer 3.3.4 | `prim:kvisko-10` |
| Zadatak 3.3.4 | `zad:kvisko-10` |
| Primer 3.3.5 | `prim:kvisko-11` |
| Zadatak 3.3.5 | `zad:kvisko-11` |
| Zadatak 3.4.1 | `zad:hooks-podaci` |
| Primer 3.4.1 | `prim:hooks-ruter` |
| Primer 3.4.2 | `prim:hooks-prijava` |
| Zadatak 3.4.2 | `zad:hooks-registracija` |
| Zadatak 3.4.3 | `zad:hooks-fokus` |
| Zadatak 3.4.4 | `zad:hooks-tabla` |

Detaljniji opis dopuna nalazi se u [docs/koraci.json](docs/koraci.json).


## Ispravke na grani feat/react-async-fixes

Svi javni izvozi servisa su asinhrone funkcije. Pozivaoci čekaju rezultat preko await ili then i obrađuju odbačen Promise. Validacija se ponavlja u servisu pre upisa, tako da direktan poziv ne može da zaobiđe pravila forme.

Predmet sadrži naziv, kod, opis (20–2000 znakova), sliku (.png ili .jpg) i celobrojni ESPB (1–60). Slika se bira iz datoteke, a njen sadržaj ostaje u memoriji pregledača do osvežavanja stranice. Putanja i prikaz izabrane slike koriste zajednički modul utils/slike.js. Za postojeću sliku baze podataka dodata je JPG verzija.

Komponenta PredmetiStranica učitava podatke i renderuje PredmetiPrikaz. App od Primera 3.3.1 renderuje stranicu. Izbor tačne opcije pitanja ima pristupačan naziv i uputstvo u informacionom alertu.

Vite koristi adresu tekućeg zahteva za resurse i razvojnu vezu, bez fiksiranog origin i HMR porta. Slike zato rade i kada se aplikaciji pristupa preko prosleđenog porta.

Opis geografije usklađen je sa tabelom podataka u zbirci.
