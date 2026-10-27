// @astrojs/vercel 7 (the last version for astro 4) knows only node 18 and 20, and writes
// "nodejs18.x" for the server function on any other node. vercel no longer accepts
// either, so this sets each function's runtime to the node version of the build.
// remove it after an upgrade to astro 5 or newer with a newer @astrojs/vercel.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const functions = '.vercel/output/functions';
const runtime = `nodejs${process.versions.node.split('.')[0]}.x`;

for (const name of readdirSync(functions)) {
  if (!name.endsWith('.func')) continue;
  const file = `${functions}/${name}/.vc-config.json`;
  const config = JSON.parse(readFileSync(file, 'utf8'));
  config.runtime = runtime;
  writeFileSync(file, JSON.stringify(config, null, '\t') + '\n');
  console.log(`${name}: runtime ${runtime}`);
}
