import { defineConfig } from '@rsbuild/core';
import { pluginFoo } from '../src';
import { readConfig } from '@remix-run/dev/dist/config.js';
const remixConfig = readConfig();
export default defineConfig({
  plugins: [pluginFoo()],
});
