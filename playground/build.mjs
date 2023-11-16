import { createRsbuild } from '@rsbuild/core';
import * as path from 'path';
import config from './rsbuild.config.mjs';
const start = async () => {
  const client = await createRsbuild({
    target: ['web'],
    rsbuildConfig: config,
  })
  const server = await createRsbuild({
    target: ['node'],
    rsbuildConfig: config,
  })
  await client.build();
  // await server.build();
};

start();
