import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const options = {
    columnSeparator: ",",
    lineSeparator: "\n",
    quote: "\"",
  };

const CountriesCSV = await readCSVObjects(await Deno.open("./data/kraje.csv"), options);
const CategoriesCSV = await readCSVObjects(await Deno.open("./data/kategorie.csv"), options);
const PlantsCSV = await readCSVObjects(await Deno.open("./data/rosliny.csv"), options);
const PlantCountriesCSV = await readCSVObjects(await Deno.open("./data/kraje_roslin.csv"), options);

let CategoriesLine = "INSERT INTO kategorie(Nazwa) VALUES \n";
for await (const c of CategoriesCSV) {
    CategoriesLine += `(${c.Nazwa}),`;
}
CategoriesLine = removeComma(CategoriesLine);

let CountriesLine = "INSERT INTO kraje(Kraj) VALUES \n";
for await (const c of CountriesCSV) {
    CountriesLine += `(${c.Kraj}),`;
}
CountriesLine = removeComma(CountriesLine);

let PlantsLine = "INSERT INTO rosliny(Nazwa, Nazwa_lacinska, Id_rodzaju_rosliny, Wydajnosc_miodowa, Wydajnosc_pylkowa, Zdjecie) VALUES \n";
for await (const c of PlantsCSV) {
    PlantsLine += `(${c.Nazwa}, ${c.Nazwa_lacinska}, ${c.Id_rodzaju_rosliny}, ${c.Wydajnosc_miodowa}, ${c.Wydajnosc_pylkowa}, ${c.Zdjecie}),`;
}
PlantsLine = removeComma(PlantsLine);

let PlantCountriesLine = "INSERT INTO kraje_roslin(Id_kraju, Id_rosliny) VALUES \n";
for await (const c of PlantCountriesCSV) {
    PlantCountriesLine += `(${c.Id_kraju, c.Id_rosliny}),\n`;
}
PlantCountriesLine = removeComma(PlantCountriesLine);

Deno.writeTextFileSync("./rosliny-insert.sql", "USE RoslinyMiododajne;\n" + CategoriesLine + CountriesLine + PlantCountriesLine + PlantCountriesLine);
 
function removeComma(str: string)
{
    const r = str.split("").reverse().join("");
    r.replace(",", ";");
    return r.split("").reverse().join("");
}
