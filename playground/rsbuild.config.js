"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@rsbuild/core");
var src_1 = require("../src");
var config_js_1 = require("@remix-run/dev/dist/config.js");
var remixConfig = (0, config_js_1.readConfig)();
exports.default = (0, core_1.defineConfig)({
    source: {
        entry: {}
    },
    plugins: [(0, src_1.pluginFoo)(remixConfig)],
});
