#!/usr/bin/env node
/**
 * IndexNow 推送：把 sitemap 里的全部 URL 主动推给 Bing / Yandex / Seznam 等。
 *
 * 用法（部署完成后再跑，因为 IndexNow 会先校验根目录的 key 文件）：
 *   node scripts/indexnow.mjs                 # 推送 sitemap 里的全部 URL
 *   node scripts/indexnow.mjs <url> [<url>…]  # 只推送指定 URL
 *
 * 说明：
 * - 不依赖任何 API key 账号，只靠根目录的 {KEY}.txt 证明站点所有权。
 * - key 文件由 public/{KEY}.txt 提供，随每次构建一起发布。
 * - 提交是尽力而为：返回 200/202 表示已接收，不保证立即收录。
 */
import crypto from "node:crypto";

const HOST = "www.convertgb.shop";
const ORIGIN = `https://${HOST}`;
const KEY = "2e842de2fe627c2f09fa90d095f14d03";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap 拉取失败: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!urls.length) throw new Error("sitemap 里没解析到任何 <loc>");
  return urls;
}

async function checkKey() {
  const res = await fetch(KEY_LOCATION, { cache: "no-store" });
  if (!res.ok) throw new Error(`key 文件不可访问: ${KEY_LOCATION} → HTTP ${res.status}`);
  const body = (await res.text()).trim();
  if (body !== KEY) throw new Error(`key 文件内容不匹配: 期望 ${KEY}，实际 ${body.slice(0, 64)}`);
  console.log(`✓ key 文件已上线并校验通过: ${KEY_LOCATION}`);
}

async function submit(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  const ok = res.status === 200 || res.status === 202;
  console.log(`${ok ? "✓" : "✗"} IndexNow 响应 HTTP ${res.status}${text ? ` — ${text.slice(0, 300)}` : ""}`);
  if (!ok) process.exitCode = 1;
}

const cliUrls = process.argv.slice(2).filter((a) => a.startsWith("http"));
const urls = cliUrls.length ? cliUrls : await sitemapUrls();

console.log(`准备推送 ${urls.length} 条 URL`);
for (const u of urls) console.log(`  ${u}`);

await checkKey();
await submit(urls);

// 本地留一份可复现的记录
console.log(`\n推送批次指纹: ${crypto.createHash("sha256").update(urls.join("\n")).digest("hex").slice(0, 16)}`);
