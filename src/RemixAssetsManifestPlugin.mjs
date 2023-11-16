import {toManifest, writeManifest} from "./manifest.js";
import type { Compiler, Compilation } from "webpack";

interface RemixConfig {
  entryClientFilePath: string;
  assetsBuildDirectory: string;
  routes: Record<string, {file: string}>;
  appDirectory: string;
}

class RemixAssetsManifestPlugin {
  private remixConfig: RemixConfig;

  constructor(remixConfig: RemixConfig) {
    this.remixConfig = remixConfig;
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tapPromise(
      "RemixAssetsManifest",
      async (compilation: Compilation) => {
        const stats = compilation.getStats();
        const manifest = await toManifest(this.remixConfig, stats);
        writeManifest(this.remixConfig, manifest);
      }
    );
  }
}

export {RemixAssetsManifestPlugin}
