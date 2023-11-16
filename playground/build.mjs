import { createRsbuild } from '@rsbuild/core';
import * as path from 'path';
const start = async () => {
  const rsbuild = await createRsbuild({
    target: ['web'],
    configPath: path.resolve('./rsbuild.config.ts'),
  })
  const cfg = config
  await rsbuild.build(cfg);
  console.log(rsbuild)
};

start();
