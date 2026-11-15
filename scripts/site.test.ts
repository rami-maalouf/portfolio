import { expect, test } from "bun:test";

const site = process.env.SITE_URL ?? "http://localhost:3000";

test("home offers useful destinations in the initial HTML before the 3D scene loads", async () => {
  const html = await (await fetch(new URL("/", site))).text();
  expect(html).toContain('aria-label="Explore my work"');
  expect(html).toContain("I build software, share what I learn");
  expect(html).toContain('href="https://notes.ramimaalouf.com"');
});

for (const path of ["/", "/about", "/contact", "/support"]) {
  test(`${path} renders a complete page with all footer icons`, async () => {
    const response = await fetch(new URL(path, site));
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).not.toContain("Internal server error");
    expect(html).toMatch(/<\/html>\s*$/);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";
    expect(footer.match(/<svg\b/g)).toHaveLength(8);
  });
}
