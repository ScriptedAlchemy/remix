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
  const { serverMode, browserNodeBuiltinsPolyfill } = remixConfig; // Set the mode to the remix config mode
  if (process.env.NODE_ENV === 'production') {
    await client.build();
    await server.build();
    if (remixConfig.serverModuleFormat === 'esm') {
      const sr = await import('./build/index.mjs');
    } else {
      const sr = await import('./build/index.js');
    }
  } else {
    await client.startDevServer({
      printURLs: false,
    });
    await server.startDevServer({
      printURLs: false,
    });
  }
};

start();
