import path from "path";

export const routeSet = new Set();
export function getRoutes(remixConfig) {
  return Object.fromEntries(
    Object.entries(remixConfig.routes).map(([key, route]) => {
      const fullPath = path.resolve(remixConfig.appDirectory, route.file);
      routeSet.add(fullPath);
      return [key, fullPath];
    })
  );
}

