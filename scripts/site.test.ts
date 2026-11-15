import { expect, test } from "bun:test";

const site = process.env.SITE_URL ?? "http://localhost:3000";

for (const path of ["/", "/about", "/contact", "/support"]) {
  test(`${path} renders a complete page with all footer icons`, async () => {
    const response = await fetch(new URL(path, site));
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).not.toContain("Internal server error");
    expect(html).toMatch(/<\/html>\s*$/);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";
    expect(footer.match(/<svg\b/g)).toHaveLength(9);
  });
}
