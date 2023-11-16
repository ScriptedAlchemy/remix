// Assuming you have the '@rsbuild/core' module installed in your project
// If not, you need to install it using npm or yarn
import {setConfig} from '@rsbuild/shared';
import * as path from 'path';
import { getRoutes } from './get-routes.mjs';
import { RemixAssetsManifestPlugin } from './RemixAssetsManifestPlugin.mjs';

export const pluginFoo = (remixOptions = {}) => ({
  name: 'plugin-foo',

  setup(api, options) {
    api.modifyRsbuildConfig(async (config, options) => {
      console.log(config,options)
      const remixConfig = await remixOptions;
      console.log(remixConfig)
      if(api.context.target.includes('node') || api.context.target.includes('async-node')){
        setConfig(config,'output.distPath.root', path.basename(remixConfig.serverBuildPath));
      } else {
        setConfig(config, 'output.distPath.root',remixConfig.relativeAssetsBuildDirectory);
      }

      return config
    })
    api.modifyRspackConfig(async (config, options) => {
      const remixConfig = await remixOptions;
      if(!options.isServer) {
        config.entry = {
          'entry.client': remixConfig.entryClientFilePath,
          ...getRoutes(remixConfig)
        };
        setConfig(config, 'target', 'web');
        setConfig(config, 'name', 'browser');
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
      } else {
        config.entry = remixConfig.entryServerFilePath;
      }


       // console.log({ config, options, api});
      return config
    });
  }
});
