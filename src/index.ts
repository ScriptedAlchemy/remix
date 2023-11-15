// Assuming you have the '@rsbuild/core' module installed in your project
// If not, you need to install it using npm or yarn
import type { RsbuildPlugin } from '@rsbuild/core';
import {setConfig} from '@rsbuild/shared';
import { getRoutes } from './get-routes';
import { RemixAssetsManifestPlugin } from './RemixAssetsManifestPlugin';
// Define the types for api, remixOptions, config, and options
type ApiType = any; // Replace 'any' with the actual type when you know it
type RemixOptionsType = any; // Replace 'any' with the actual type when you know it
type ConfigType = { entry: any }; // Replace 'any' with the actual type when you know it
type OptionsType = any; // Replace 'any' with the actual type when you know it
export type FooPugOptions = {};

export const pluginFoo = (remixOptions: RemixOptionsType = {}): RsbuildPlugin => ({
  name: 'plugin-foo',

  setup(api: ApiType, options) {
    api.modifyRspackConfig(async (config: ConfigType, options: OptionsType) => {
      const remixConfig = await remixOptions;
      config.entry = {
        'entry.client': remixConfig.entryClientFilePath,
        ...getRoutes(remixConfig)
      };
      setConfig(config,'target','web');
      setConfig(config,'name','browser');
      setConfig(config, 'output.path', remixConfig.assetsBuildDirectory);
      setConfig(config, 'output.publicPath', 'auto');
      setConfig(config, 'output.module', true);
      setConfig(config, 'output.library', { type: 'module' });
      setConfig(config, 'output.chunkFormat', 'module');
      setConfig(config, 'output.chunkLoading', 'import');
      setConfig(config, 'output.assetModuleFilename', '_assets/[name]-[contenthash][ext]');
      setConfig(config, 'output.cssChunkFilename', '_assets/[name]-[contenthash].css');
      setConfig(config, 'output.filename', '[name]-[contenthash].js');
      setConfig(config, 'output.chunkFilename', '[name]-[contenthash].js');
      config.plugins.push(new RemixAssetsManifestPlugin(remixConfig))

      console.log({ config, options });
      return config
    });
  }
});
