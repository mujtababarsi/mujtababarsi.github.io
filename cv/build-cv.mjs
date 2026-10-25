// Prints cv/cv.html to public/Mohamed_Elmugtaba_Bioinformatics_CV.pdf with headless Chrome.
// Run with `npm run cv`. Set CHROME_PATH if Chrome or Chromium isn't found automatically.
import { existsSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'cv/cv.html');
const output = resolve(root, 'public/Mohamed_Elmugtaba_Bioinformatics_CV.pdf');

const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chrome = candidates.find(p => existsSync(p));
if (!chrome) {
  console.error('Chrome not found. Set CHROME_PATH to your Chrome or Chromium executable.');
  process.exit(1);
}

if (!existsSync(resolve(root, 'node_modules/@fontsource/lora'))) {
  console.error('CV fonts missing. Run `npm install` first.');
  process.exit(1);
}

const run = spawnSync(chrome, [
  '--headless',
  '--no-sandbox',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=5000', // let the self-hosted fonts load before printing
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href,
], { stdio: 'inherit' });

if (run.status !== 0 || !existsSync(output)) {
  console.error('Chrome did not write the PDF.');
  process.exit(1);
}
console.log(`Wrote ${output} (${Math.round(statSync(output).size / 1024)} KB)`);
