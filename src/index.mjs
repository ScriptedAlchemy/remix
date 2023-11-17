// Assuming you have the '@rsbuild/core' module installed in your project
// If not, you need to install it using npm or yarn
import { setConfig } from '@rsbuild/shared';
import * as path from 'path';
import * as fs from 'fs';
import { getRoutes } from './get-routes.mjs';
import { getManifest } from './manifest.mjs';
import { RemixAssetsManifestPlugin } from './RemixAssetsManifestPlugin.mjs';
import { createServerBuildEntry } from '../playground/utils/server-build-entry.js';
import nodeExternals from 'webpack-node-externals';

const serverBuildModule = './.cache/server-build.js';

export const pluginFoo = (remixOptions = {}) => ({
  name: 'plugin-foo',
  setup(api, options) {
    api.modifyRsbuildConfig(async (config, options) => {
      const remixConfig = await remixOptions;
      if (api.context.target.includes('node') || api.context.target.includes('async-node')) {
        const serverBuildPathDir = path.dirname(remixConfig.serverBuildPath);
        setConfig(config, 'output.distPath.root', serverBuildPathDir);
        setConfig(config, 'source.alias[\'@remix-run/dev/server-build.js\']', serverBuildModule);
        const manifest = getManifest();
        const serverBuildEntry = createServerBuildEntry(remixConfig, manifest);
        fs.writeFileSync(serverBuildModule, serverBuildEntry, 'utf8');

      } else {
        setConfig(config, 'output.distPath.root', remixConfig.assetsBuildDirectory);
      }
      return config;
    });

    api.modifyRspackConfig(async (config, options) => {
      const remixConfig = await remixOptions;
      const isModule = remixConfig.serverModuleFormat === 'esm';
      if (!options.isServer) {
        config.entry = {
          'entry.client': remixConfig.entryClientFilePath,
          ...getRoutes(remixConfig)
        };
        setConfig(config, 'externalsType', 'module');
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
        setConfig(config, 'experiments.outputModule', true);
        config.plugins.push(new RemixAssetsManifestPlugin(remixConfig));
      } else {

        setConfig(config, 'name', 'server');

        setConfig(config, 'experiments.asyncDebAssembly', false);
        setConfig(config, 'output.filename', path.basename(remixConfig.serverBuildPath));
        setConfig(config, 'output.library', { type: isModule ? 'module' : 'commonjs' });
        setConfig(config, 'output.chunkFormat', isModule ? 'module' : 'commonjs');
        setConfig(config, 'output.chunkLoading', isModule ? 'import' : undefined);
        setConfig(config, 'output.module', isModule);
        setConfig(config, 'output.publicPath', remixConfig.publicPath);
        setConfig(config, 'output.assetModuleFilename', '_assets/[name]-[contenthash][ext]');
        setConfig(config, 'output.cssChunkFilename', '_assets/[name]-[contenthash][ext]');
        setConfig(config, 'output.chunkFilename', '[name]-[chunkhash].js');

        setConfig(config, 'externals', [
          nodeExternals({
            allowlist: [/^@remix-run\/dev/],
            importType: isModule ? 'module' : 'commonjs'
          })
        ]);
        setConfig(config, 'externalsType', isModule ? 'module' : undefined);
        setConfig(config, 'externalsPresets', { node: true });

        if (isModule) setConfig(config, 'experiments.outputModule', isModule);
        config.entry = remixConfig.serverEntryPoint || serverBuildModule;



      }
      return config;
    });

  }
});
