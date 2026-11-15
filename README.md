# Receptų programėlė

Mokomoji React programėlė su registracija, prisijungimu,
apsaugotais maršrutais ir asmeniniu mėgstamiausių receptų sąrašu.

## Funkcionalumas

- Registracija su laukų ir pasikartojančio el. pašto tikrinimu.
- Prisijungimas ir atsijungimas.
- Naudotojo būsenos išlaikymas tame pačiame naršyklės skirtuke.
- Tik prisijungus pasiekiami receptų puslapiai.
- Receptų sąrašas su puslapiavimu po 5 receptus.
- Išsami recepto peržiūra.
- Mėgstamiausių pridėjimas ir šalinimas sąraše bei recepto peržiūroje.
- Atskiras mėgstamiausių sąrašas kiekvienam naudotojui.
- Duomenų išsaugojimas vietiniame serveryje.
- Įkėlimo, klaidų ir tuščių sąrašų pranešimai.

## Naudotos versijos

Versijos pagal projekto package-lock.json:

| Priemonė | Versija |
| --- | --- |
| React | 19.3.1 |
| React DOM | 19.3.1 |
| React Router DOM | 6.30.6 |
| Vite | 8.3.8 |
| json-server | 0.17.4 |
| Oxlint | 1.93.0 |

Projektas kurtas naudojant Node.js 24.21.0 ir npm 11.19.0.

## Diegimas

Atsisiųskite arba klonuokite saugyklą ir terminale
atidarykite pagrindinį projekto aplanką.

Įdiekite priklausomybes pagal užrakto failą:

```powershell
npm.cmd ci
```

## Paleidimas

Reikalingi du terminalai, atidaryti projekto aplanke.

Pirmame terminale paleiskite vietinį duomenų serverį:

```powershell
npm.cmd run server
```

Serverio adresas: http://localhost:3001

Antrame terminale paleiskite React programėlę:

```powershell
npm.cmd run dev
```

Naršyklėje atidarykite terminale nurodytą adresą,
paprastai http://localhost:5173.

Receptams gauti reikalingas interneto ryšys.

## Demonstraciniai naudotojai

Faile db.json yra išgalvotos demonstracinės paskyros:

- john.doe@example.com
- jane.smith@example.com

Jų mokomieji slaptažodžiai pateikti db.json lauke password.
Taip pat galima užregistruoti naują išgalvotą naudotoją.

## Maršrutai

| Adresas | Turinys | Prieiga |
| --- | --- | --- |
| / | Pradinis puslapis | Vieša |
| /login | Prisijungimas | Vieša |
| /register | Registracija | Vieša |
| /dashboard | Receptų sąrašas | Tik prisijungus |
| /recipe/:id | Recepto informacija | Tik prisijungus |
| /favorites | Asmeniniai mėgstamiausi | Tik prisijungus |

## Duomenų saugojimas

Receptai gaunami iš https://dummyjson.com/recipes.

Vietinis json-server naudoja db.json kolekcijas:

- users – naudotojų duomenys.
- favorites – mėgstamiausių receptų įrašai.

Mėgstamiausių įrašo userId nurodo prisijungusį naudotoją,
recipeId – DummyJSON receptą, o id – patį mėgstamiausių įrašą.

Prisijungusio naudotojo id, vardas ir el. paštas saugomi
sessionStorage. Slaptažodis į šią saugyklą neįrašomas.

Atsijungus išvaloma naudotojo ir mėgstamiausių būsena
programėlėje. Serveryje mėgstamiausi išlieka.

## Patikros komandos

Kodo patikra:

```powershell
npm.cmd run lint
```

Produkcijai skirtos versijos sukūrimas:

```powershell
npm.cmd run build
```

Sukurtos versijos peržiūra:

```powershell
npm.cmd run preview
```

Naudojant peržiūros režimą vietinį duomenų serverį
taip pat reikia palikti įjungtą.

## Mokomojo sprendimo ribos

Autentifikacija imituojama naudojant json-server.
Slaptažodžiai db.json saugomi atviru tekstu,
todėl naudotini tik išgalvoti mokomieji duomenys.

ProtectedRoute riboja puslapių rodymą React programėlėje.
Šis sprendimas nesuteikia serverio autentifikacijos
ir serverio prieigos teisių kontrolės.