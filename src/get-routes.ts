import * as path from "path";

export const routeSet: Set<string> = new Set();
export const getRoutes = (remixConfig: {routes: Record<string, {file: string}>, appDirectory: string}) => Object.fromEntries(
  Object.entries(remixConfig.routes).map(([key, route]) => {
    const fullPath = path.resolve(remixConfig.appDirectory, route.file);
    routeSet.add(fullPath);
    return [key, fullPath];
  })
);

