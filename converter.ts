import {parse as parseCsv} from 'https://deno.land/std@0.82.0/encoding/csv.ts';

const options = {
    skipFirstRow: true,
    columnSeparator: ";",
    lineSeparator: "\n",
    quote: "$"
};

const CountriesCSV: any = await parseCsv(await Deno.readTextFile("./data/kraje.csv"), options);
const CategoriesCSV: any = await parseCsv(await Deno.readTextFile("./data/kategorie.csv"), options);
const PlantsCSV: any = await parseCsv((await Deno.readTextFile("./data/rosliny.csv")), options);
const PlantCountriesCSV: any = await parseCsv(await Deno.readTextFile("./data/kraje_roslin.csv"), options);

let CategoriesLine = "INSERT INTO kategorie(Nazwa) VALUES \n";
for (const ca of CategoriesCSV) {
    CategoriesLine += `(${ca.Nazwa}),\n`;
}
CategoriesLine = removeComma(CategoriesLine);

let CountriesLine = "INSERT INTO kraje(Kraj) VALUES \n";
for (const cu of CountriesCSV) {
    CountriesLine += `(${cu.Kraj}),\n`;
}
CountriesLine = removeComma(CountriesLine);

let PlantsLine = "INSERT INTO rosliny(Nazwa, Nazwa_lacinska, Id_rodzaju_rosliny, Wydajnosc_miodowa, Wydajnosc_pylkowa, Zdjecie) VALUES \n";
for (const p of PlantsCSV) {
    PlantsLine += `(${p.Nazwa}, ${p.Nazwa_lacinska}, ${p.Id_rodzaju_rosliny}, ${p.Wydajnosc_miodowa}, ${p.Wydajnosc_pylkowa}, ${p.Zdjecie}),\n`;
}
PlantsLine = removeComma(PlantsLine);

let PlantCountriesLine = "INSERT INTO kraje_roslin(Id_kraju, Id_rosliny) VALUES \n";
for (const pc of PlantCountriesCSV) {
    PlantCountriesLine += `(${pc.Id_kraju}, ${pc.Id_rosliny}),\n`;
}
PlantCountriesLine = removeComma(PlantCountriesLine);

Deno.writeTextFileSync("./rosliny-insert.sql", `USE RoslinyMiododajne;\n\n  ${CategoriesLine}\n\n ${CountriesLine}\n\n ${PlantsLine}\n\n ${PlantCountriesLine}`);
 
function removeComma(str: string)
{
    let r = str.split("").reverse().join("");
    r = r.replace(",", ";");
    r = r.split("").reverse().join("");
    return r;
}