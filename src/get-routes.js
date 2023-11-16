"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = exports.routeSet = void 0;
var path = require("path");
exports.routeSet = new Set();
var getRoutes = function (remixConfig) { return Object.fromEntries(Object.entries(remixConfig.routes).map(function (_a) {
    var key = _a[0], route = _a[1];
    var fullPath = path.resolve(remixConfig.appDirectory, route.file);
    exports.routeSet.add(fullPath);
    return [key, fullPath];
})); };
exports.getRoutes = getRoutes;
