// Assuming you have the '@rsbuild/core' module installed in your project
// If not, you need to install it using npm or yarn
import {setConfig} from '@rsbuild/shared';
import { getRoutes } from './get-routes.mjs';
import { RemixAssetsManifestPlugin } from './RemixAssetsManifestPlugin.mjs';

export const pluginFoo = (remixOptions = {}) => ({
  name: 'plugin-foo',

  setup(api, options) {
    api.modifyRspackConfig(async (config, options) => {
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
