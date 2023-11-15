import { createRsbuild } from '@rsbuild/core';

const start = async () => {
  const rsbuild = await createRsbuild({
    target: ['web', 'node']
  });
  console.log(rsbuild)
};
