import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const link = "https://pl.wikipedia.org/wiki/Rośliny_miododajne";
const page = await (await fetch(link)).text();
const html = new DOMParser().parseFromString(page, "text/html")!;
const imgs = html.getElementsByTagName("img")
  .map((i) => i.attributes.src)
  .map((l) => {
    if (l.startsWith("//")) return "https:" + l;
    else if (l.startsWith("/")) return null;
    else return l;
  });

imgs.forEach(async (i) => {
  if (i === null) return;
  const filename = "./input/" +
    i.replace("https://upload.wikimedia.org/wikipedia/commons/thumb/", "")
      .replaceAll("/", "");
  const imgdata = await (await fetch(i)).arrayBuffer();
  Deno.writeFile(filename, new Uint8Array(imgdata));
});
console.log(imgs);
