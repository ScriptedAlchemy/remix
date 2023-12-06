import { defineConfig } from '@rsbuild/core';
import { pluginFoo } from '../src/index.mjs';
import { pluginReact } from '@rsbuild/plugin-react';
import { readConfig } from '@remix-run/dev/dist/config.js';
const remixConfig = readConfig();

export default defineConfig({
  public: {
    publicDir: false
  },
  server:{
    publicDir: false,
  },
  plugins: [pluginFoo(remixConfig), pluginReact()],
});

