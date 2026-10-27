// SEO audit of prerendered HTML in .next/server/app (recursive, case-insensitive).
import fs from "node:fs";
import path from "node:path";

const root = ".next/server/app";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

const count = (h, s) => h.split(s).length - 1;

for (const file of walk(root).sort()) {
  const h = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const title = h.match(/<title>([^<]*)<\/title>/);
  const desc = h.match(/name="description" content="([^"]*)"/);
  const canon = h.match(/rel="canonical" href="([^"]*)"/i);
  const hreflang = [...h.matchAll(/rel="alternate"[^>]*hreflang="([^"]*)" href="([^"]*)"/gi)].map(
    (m) => `${m[1]}=${m[2]}`
  );
  const htmlLang = h.match(/<html lang="([^"]*)"/);
  const ld = count(h, "application/ld+json");
  const text = h
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

  console.log(`\n=== ${rel} ===`);
  console.log(`htmlLang : ${htmlLang?.[1]}`);
  console.log(`title    : ${title?.[1]}`);
  console.log(`desc     : ${desc?.[1]}  (chars=${desc?.[1]?.length ?? 0})`);
  console.log(`canonical: ${canon?.[1]}`);
  console.log(`hreflang : ${hreflang.join(" | ") || "(none)"}`);
  console.log(`headings : h1=${count(h, "<h1")} h2=${count(h, "<h2")} h3=${count(h, "<h3")}`);
  console.log(`jsonld   : ${ld}`);
  console.log(`text     : cjk=${cjk} latinWords=${words} (≈words ${Math.round(cjk / 1.5 + words)})`);
  console.log(`table    : ${count(h, "<table")}  details: ${count(h, "<details")}`);
}
