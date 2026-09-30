import * as esbuild from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const isWatch = process.argv.includes('--watch');
const outdir = 'dist';

/** @type {Array<{entry: string, out: string, format: import('esbuild').Format}>} */
const entries = [
  { entry: 'src/content.ts', out: 'content.js', format: 'iife' },
  { entry: 'src/background.ts', out: 'background.js', format: 'esm' },
  { entry: 'src/popup/popup.ts', out: 'popup/popup.js', format: 'esm' },
  { entry: 'src/options/options.ts', out: 'options/options.js', format: 'esm' },
];

async function copyStatic() {
  await mkdir(path.join(outdir, 'popup'), { recursive: true });
  await mkdir(path.join(outdir, 'options'), { recursive: true });
  await cp('manifest.json', path.join(outdir, 'manifest.json'));
  await cp('src/popup/popup.html', path.join(outdir, 'popup/popup.html'));
  await cp('src/popup/popup.css', path.join(outdir, 'popup/popup.css'));
  await cp('src/options/options.html', path.join(outdir, 'options/options.html'));
  await cp('src/options/options.css', path.join(outdir, 'options/options.css'));
}

await rm(outdir, { recursive: true, force: true });
await copyStatic();

const contexts = await Promise.all(
  entries.map(({ entry, out, format }) =>
    esbuild.context({
      entryPoints: [entry],
      outfile: path.join(outdir, out),
      bundle: true,
      format,
      target: ['chrome109', 'firefox109'],
      sourcemap: true,
      logLevel: 'info',
    }),
  ),
);

if (isWatch) {
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log('Watching for changes... (Ctrl+C to stop)');
} else {
  await Promise.all(contexts.map((ctx) => ctx.rebuild()));
  await Promise.all(contexts.map((ctx) => ctx.dispose()));
  console.log(`Build complete -> ${outdir}/`);
}
