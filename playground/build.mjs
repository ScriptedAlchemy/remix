import { createRsbuild } from '@rsbuild/core';
import config from './rsbuild.config.mjs';
const start = async () => {
  const rsbuild = await createRsbuild({
    target: ['web'],
    rsbuildConfig: config,
  })
  const cfg = config
  await rsbuild.build(cfg);
  console.log(rsbuild)
};

start();
