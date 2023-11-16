import { createRsbuild } from '@rsbuild/core';
import * as path from 'path';
import config from './rsbuild.config.mjs';
const start = async () => {
  const rsbuild = await createRsbuild({
    target: ['web'],
    rsbuildConfig: config,
  })
  rsbuild.addPlugins(config.plugins);
  await rsbuild.build();
};

start();
