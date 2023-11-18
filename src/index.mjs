// Import necessary modules
import { setConfig } from '@rsbuild/shared'; // Import setConfig function from shared module
import * as path from 'path'; // Node.js path module for handling and transforming file paths
import * as fs from 'fs'; // Node.js file system module for interacting with the file system
import { getRoutes } from './get-routes.mjs'; // Import getRoutes function from local module
import { getManifest } from './manifest.mjs'; // Import getManifest function from local module
import { RemixAssetsManifestPlugin } from './RemixAssetsManifestPlugin.mjs'; // Import RemixAssetsManifestPlugin from local module
import { createServerBuildEntry } from '../playground/utils/server-build-entry.js'; // Import createServerBuildEntry function from utils
import nodeExternals from 'webpack-node-externals'; // Import nodeExternals function from webpack-node-externals module

// Define server build module
const serverBuildModule = './.cache/server-build.js'; // Define the path for the server build module

// Export pluginFoo
export const pluginFoo = (remixOptions = {}) => ({ // Export a function that returns an object
  name: 'plugin-foo', // Name of the plugin
  setup(api, options) { // Setup function for the plugin
    api.onAfterBuild(async (config,options) => { // Event listener for after build event
      const remixConfig = await remixOptions; // Await the remixOptions promise
      const isModule = remixConfig.serverModuleFormat === 'esm'; // Check if the server module format is 'esm'

      // Check if the target includes 'node' or 'async-node'
      if (api.context.target.includes('node') || api.context.target.includes('async-node')) {

        // If the server module format is not 'esm'
        if (!isModule) {
          const dirname = path.dirname(remixConfig.serverBuildPath) // Get the directory name of the server build path
          // If the directory does not exist, create it
          if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
          }
          // Write a package.json file in the directory with type set to 'commonjs'
          fs.writeFileSync(path.join(dirname,'package.json'), JSON.stringify({ type: 'commonjs' }));
        }
      }
    });
    api.modifyRsbuildConfig(async (config, options) => { // Modify the Rsbuild config
      const remixConfig = await remixOptions; // Await the remixOptions promise
      // Check if the target includes 'node' or 'async-node'
      if (api.context.target.includes('node') || api.context.target.includes('async-node')) {
        const serverBuildPathDir = path.dirname(remixConfig.serverBuildPath); // Get the directory name of the server build path
        setConfig(config, 'output.distPath.root', serverBuildPathDir); // Set the root of the output distPath to the server build path directory
        setConfig(config, 'source.alias[\'@remix-run/dev/server-build.js\']', serverBuildModule); // Set the alias for '@remix-run/dev/server-build.js' to the server build module
        const manifest = getManifest(); // Get the manifest
        const serverBuildEntry = createServerBuildEntry(remixConfig, manifest); // Create the server build entry
        fs.writeFileSync(serverBuildModule, serverBuildEntry, 'utf8'); // Write the server build entry to the server build module
      } else {
        setConfig(config, 'output.distPath.root', remixConfig.assetsBuildDirectory); // Set the root of the output distPath to the assets build directory
      }
      return config; // Return the modified config
    });

    api.modifyRspackConfig(async (config, options) => { // Modify the Rspack config
      const remixConfig = await remixOptions; // Await the remixOptions promise
      const isModule = remixConfig.serverModuleFormat === 'esm'; // Check if the server module format is 'esm'
      if (!options.isServer) { // If the options do not include 'isServer'
        config.entry = { // Set the entry points for the config
          'entry.client': remixConfig.entryClientFilePath, // Set the client entry point to the entry client file path
          ...getRoutes(remixConfig) // Spread the routes from the remix config
        };
        setConfig(config, 'externalsType', 'module'); // Set the externals type to 'module'
        setConfig(config, 'target', 'web'); // Set the target to 'web'
        setConfig(config, 'name', 'browser'); // Set the name to 'browser'
        setConfig(config, 'output.publicPath', remixConfig.publicPath || 'auto'); // Set the public path to the remix config public path or 'auto' if it does not exist
        setConfig(config, 'output.module', true); // Set the output module to true
        setConfig(config, 'output.library', { type: 'module' }); // Set the output library type to 'module'
        setConfig(config, 'output.chunkFormat', 'module'); // Set the output chunk format to 'module'
        setConfig(config, 'output.chunkLoading', 'import'); // Set the output chunk loading to 'import'
        setConfig(config, 'output.assetModuleFilename', '_assets/[name]-[contenthash][ext]'); // Set the output asset module filename
        setConfig(config, 'output.cssChunkFilename', '_assets/[name]-[contenthash].css'); // Set the output CSS chunk filename
        setConfig(config, 'output.filename', '[name]-[contenthash].js'); // Set the output filename
        setConfig(config, 'output.chunkFilename', '[name]-[contenthash].js'); // Set the output chunk filename
        setConfig(config, 'experiments.outputModule', true); // Set the experiments output module to true
        config.plugins.push(new RemixAssetsManifestPlugin(remixConfig)); // Push a new instance of RemixAssetsManifestPlugin to the plugins array
      } else {
        const ext = isModule ? 'mjs' : 'js'; // Set the extension to 'mjs' if the server module format is 'esm', otherwise set it to 'js'
        setConfig(config, 'name', 'server'); // Set the name to 'server'
        setConfig(config, 'output.filename', path.basename(remixConfig.serverBuildPath, path.extname(remixConfig.serverBuildPath)) + '.' + ext); // Set the output filename
        setConfig(config, 'output.library', { type: isModule ? 'module' : 'commonjs' }); // Set the output library type to 'module' if the server module format is 'esm', otherwise set it to 'commonjs'
        setConfig(config, 'output.libraryTarget', isModule ? 'module' : 'commonjs2' ); // Set the output library target to 'module' if the server module format is 'esm', otherwise set it to 'commonjs2'
        setConfig(config, 'output.chunkFormat', isModule ? 'module' : 'commonjs'); // Set the output chunk format to 'module' if the server module format is 'esm', otherwise set it to 'commonjs'
        setConfig(config, 'output.chunkLoading', isModule ? 'import' : undefined); // Set the output chunk loading to 'import' if the server module format is 'esm', otherwise set it to undefined
        setConfig(config, 'output.module', isModule); // Set the output module to the value of isModule
        setConfig(config, 'output.publicPath', remixConfig.publicPath); // Set the public path to the remix config public path
        setConfig(config, 'output.assetModuleFilename', '_assets/[name]-[contenthash][ext]'); // Set the output asset module filename
        setConfig(config, 'output.cssChunkFilename', '_assets/[name]-[contenthash].css'); // Set the output CSS chunk filename
        setConfig(config, 'output.chunkFilename', '[name]-[chunkhash].' + ext); // Set the output chunk filename
        setConfig(config, 'externals', [ // Set the externals
          nodeExternals({ // Use the nodeExternals function
            allowlist: [/^@remix-run\/dev/], // Allowlist '@remix-run/dev'
            importType: isModule ? 'module' : 'commonjs' // Set the import type to 'module' if the server module format is 'esm', otherwise set it to 'commonjs'
          })
        ]);
        setConfig(config, 'externalsType', isModule ? 'module' : undefined); // Set the externals type to 'module' if the server module format is 'esm', otherwise set it to undefined
        setConfig(config, 'externalsPresets', { node: true }); // Set the externals presets to { node: true }
        if (isModule) setConfig(config, 'experiments.outputModule', isModule); // If the server module format is 'esm', set the experiments output module to true
        config.entry = remixConfig.serverEntryPoint || serverBuildModule; // Set the entry to the server entry point or the server build module if the server entry point does not exist
      }
      return config; // Return the modified config
    });
  }
});

