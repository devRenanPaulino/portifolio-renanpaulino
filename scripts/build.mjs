// Monta index.html a partir de html/template.html + html/partials/*.html
// Uso:  node scripts/build.mjs           (gera uma vez)
//       node scripts/build.mjs --watch   (regera ao salvar qualquer arquivo em html/)
import { readFileSync, writeFileSync, watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlDir = resolve(root, "html");

function build() {
  const template = readFileSync(resolve(htmlDir, "template.html"), "utf8");
  const html = template.replace(/^([ \t]*)<!-- @include (.+?) -->/gm, (_, indent, file) => {
    const partial = readFileSync(resolve(htmlDir, file), "utf8").trim();
    return partial
      .split("\n")
      .map((line) => (line ? indent + line : line))
      .join("\n");
  });
  writeFileSync(resolve(root, "index.html"), html);
  console.log(`[${new Date().toLocaleTimeString("pt-BR")}] index.html gerado`);
}

build();

if (process.argv.includes("--watch")) {
  let timer;
  watch(htmlDir, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (e) {
        console.error(e.message);
      }
    }, 80);
  });
  console.log("Observando html/ … (Ctrl+C para sair)");
}
