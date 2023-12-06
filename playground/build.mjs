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
    rsbuildConfig: {
      ...config,
      dev: {
        setupMiddlewares: [
          (middlewares, server) => {
            // console.log({ middlewares, server });
            // middlewares.unshift(createRequestHandler({ build }))
            console.log('before');
            console.log('after');
            middlewares.unshift(async (req, res, next) => {
              const express = (await import('./build/index.js')).default;
              express.default.handle(req, res, next);
            });
          }
        ]
      }
    }
  });
  const server = await createRsbuild({
    target: ['node'],
    rsbuildConfig: { ...config}
  });
  const { serverMode, browserNodeBuiltinsPolyfill } = remixConfig; // Set the mode to the remix config mode
  if (process.env.NODE_ENV === 'production') {
    await client.build();
    await server.build();
    if (remixConfig.serverModuleFormat === 'esm') {
      const sr = await import('./build/index.mjs');
    } else {
      const { serve } = (await import('./build/index.js')).default;
      serve()
    }
  } else {
    console.log('starting dev client');
    await client.startDevServer({
      printURLs: false
    });
    console.log('starting dev server');
    await server.startDevServer({
      printURLs: false
    });
    const isModule = packageJSon.type === 'module';
    if (isModule) {
      if (!fs.existsSync('./build')) {
        fs.mkdirSync('./build');
      }

      console.log('writing package.json');
      fs.writeFileSync('./build/package.json', JSON.stringify({ type: 'commonjs' }));
    }
  }
};

start();
