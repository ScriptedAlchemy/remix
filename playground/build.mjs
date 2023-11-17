import { createRsbuild } from '@rsbuild/core';
import config from './rsbuild.config.mjs';
import * as fs from 'fs';
import packageJSon from './package.json' assert { type: 'json' };
import { readConfig } from '@remix-run/dev/dist/config.js';
const start = async () => {
  const remixConfig = await readConfig();

  const client = await createRsbuild({
    target: ['web'],
    rsbuildConfig: config,
  })
  const server = await createRsbuild({
    target: ['node'],
    rsbuildConfig: config,
  })
  await client.build();
  await server.build();
  const isModule = packageJSon.type === 'module'
  if (remixConfig.serverModuleFormat !== 'esm') {
    if (!fs.existsSync('./build')) {
      fs.mkdirSync('./build');
    }
    fs.writeFileSync('./build/package.json', JSON.stringify({ type: 'commonjs' }));
  }
  const sr = await import('./build/index.js')
  console.log(sr)
};

start();
