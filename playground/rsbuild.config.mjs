import { defineConfig } from '@rsbuild/core';
import { pluginFoo } from '../src/index.mjs';
import { readConfig } from '@remix-run/dev/dist/config.js';
const remixConfig = readConfig();
export default defineConfig({
  source:{
    entry: {},
  },
  output:{
    distPath:{
      root: remixConfig.assetsBuildDirectory,
    },
  },
  plugins: [pluginFoo(remixConfig)],
});
