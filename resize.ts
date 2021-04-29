import { Image } from "https://deno.land/x/imagescript/mod.ts";

for await (const dirEntry of Deno.readDir("./input")) {
  console.log(dirEntry.name);
  const img = await Image.decode(await Deno.readFile("./input/" + dirEntry.name));
  resize(img, "./output/" + dirEntry.name);
}

async function resize(img: Image, name: string) {
  if(img.width > img.height) img.resize(Image.RESIZE_AUTO, 300);
  else if(img.width < img.height) img.resize(300, Image.RESIZE_AUTO);
  else img.resize(300, 300);
    img.crop(0, 0 ,300, 300);
  await Deno.writeFile(name, await img.encode());
}
