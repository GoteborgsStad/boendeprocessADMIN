# Sambuh - Admin

## Översikt
Sambuh - frontend är ett administrationsverktyg för att hantera den data som finns lagrad i Sambuh - API.

## Installation

[1] Klona ner projektet på önskad plats.
```
git clone <via SSH eller HTTP(S)>
```

[2] Installera nödvändiga paket. Nagivera till roten av projektet.

```
npm install
```

[3] Konfigurera miljövariabler genom att fylla i de uppgifter som efterfrågas i `./src/environments`.

[4] För att köra applikationen lokalt

```
ng serve --configuration=<miljö som sattes upp i [3]>
```

[5] För att bygga ut applikationen

```
ng build --configuration=<miljö som sattes upp i [3]>
```
