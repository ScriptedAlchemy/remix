import { createRsbuild } from '@rsbuild/core';
import config from './rsbuild.config.mjs';
import * as fs from 'fs';
import * as path from 'path';
import packageJSon from './package.json' assert { type: 'json' };
import { readConfig } from '@remix-run/dev/dist/config.js';

const start = async () => {
  const remixConfig = await readConfig();
  const client = await createRsbuild({
    target: ['web'],
    rsbuildConfig: config
  });
  const server = await createRsbuild({
    target: ['node'],
    rsbuildConfig: config
  });
  await client.build();
  await server.build();
  if(remixConfig.serverModuleFormat === 'esm') {
    const sr = await import('./build/index.mjs');
  } else {
    const sr = await import('./build/index.js');
  }
};

start();
