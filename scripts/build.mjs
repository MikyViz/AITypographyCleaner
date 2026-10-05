import * as esbuild from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const isWatch = process.argv.includes('--watch');
const targetArg = process.argv.find((arg) => arg.startsWith('--target='));
const target = targetArg ? targetArg.split('=')[1] : 'chrome';

if (target !== 'chrome' && target !== 'firefox') {
  throw new Error(`Unknown --target=${target}, expected "chrome" or "firefox"`);
}

const outdir = target === 'firefox' ? 'dist-firefox' : 'dist';

/** @type {Array<{entry: string, out: string}>} */
const entries = [
  { entry: 'src/content.ts', out: 'content.js' },
  { entry: 'src/background.ts', out: 'background.js' },
  { entry: 'src/popup/popup.ts', out: 'popup/popup.js' },
  { entry: 'src/options/options.ts', out: 'options/options.js' },
];

async function writeManifest() {
  const manifest = JSON.parse(await readFile('manifest.json', 'utf8'));
  // Chrome MV3 requires "service_worker"; Firefox runs background as a classic non-persistent script via "scripts".
  manifest.background =
    target === 'firefox' ? { scripts: ['background.js'] } : { service_worker: 'background.js' };
  await writeFile(path.join(outdir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

async function copyStatic() {
  await mkdir(path.join(outdir, 'popup'), { recursive: true });
  await mkdir(path.join(outdir, 'options'), { recursive: true });
  await writeManifest();
  await cp('_locales', path.join(outdir, '_locales'), { recursive: true });
  await cp('src/popup/popup.html', path.join(outdir, 'popup/popup.html'));
  await cp('src/popup/popup.css', path.join(outdir, 'popup/popup.css'));
  await cp('src/options/options.html', path.join(outdir, 'options/options.html'));
  await cp('src/options/options.css', path.join(outdir, 'options/options.css'));
}

await rm(outdir, { recursive: true, force: true });
await copyStatic();

const contexts = await Promise.all(
  entries.map(({ entry, out }) =>
    esbuild.context({
      entryPoints: [entry],
      outfile: path.join(outdir, out),
      bundle: true,
      format: 'iife', // self-contained classic script, works as both service_worker and background.scripts
      target: ['chrome109', 'firefox109'],
      sourcemap: true,
      logLevel: 'info',
    }),
  ),
);

if (isWatch) {
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log(`Watching for changes (target=${target})... (Ctrl+C to stop)`);
} else {
  await Promise.all(contexts.map((ctx) => ctx.rebuild()));
  await Promise.all(contexts.map((ctx) => ctx.dispose()));
  console.log(`Build complete (target=${target}) -> ${outdir}/`);
}
