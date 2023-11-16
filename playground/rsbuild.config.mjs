import { defineConfig } from '@rsbuild/core';
import { pluginFoo } from '../src/index.mjs';
import { readConfig } from '@remix-run/dev/dist/config.js';
const remixConfig = await readConfig();
const defaultDistPath = {
  root: remixConfig.assetsBuildDirectory,
  html: '/',
  js: 'static/js',
  css: 'static/css',
  svg: 'static/svg',
  font: 'static/font',
  wasm: 'static/wasm',
  image: 'static/image',
  media: 'static/media',
  server: 'bundles',
  worker: 'worker',
};
export default defineConfig({
  source:{
    entry: {},
  },
  // output:{
  //   distPath:defaultDistPath
  // },
  plugins: [pluginFoo(remixConfig)],
});
