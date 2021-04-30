import { fromUint8Array } from "https://denopkg.com/chiefbiiko/base64/mod.ts";

const tags: string[] = [];

for await (const dirEntry of Deno.readDir("./input")) {
    console.log(dirEntry.name);
    const img = await Deno.readFile("./input/" + dirEntry.name);
    tags.push(`<img alt"${dirEntry.name.replace(".jpg", "")}" src="data:image/jpg;base64,${fromUint8Array(img)}">`);
}
Deno.writeTextFileSync("tags.html", tags.join("\n"));