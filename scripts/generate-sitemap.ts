import { writeFileSync } from "node:fs";
import { siteUrls } from "../src/lib/seo";

const urls = siteUrls();
const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
console.log(`sitemap.xml: ${urls.length} urls`);
