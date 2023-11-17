
  import * as entryServer from "/Users/zackjackson/lulu_dev/remix-rsbuild/playground/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx";
  import * as route0 from "../app/root.tsx";
import * as route1 from "../app/routes/_index.tsx";
  export const entry = { module: entryServer };
  export const routes = {
    "root": {
      id: "root",
      parentId: undefined,
      path: "",
      index: undefined,
      caseSensitive: undefined,
      module: route0
    },
  "routes/_index": {
      id: "routes/_index",
      parentId: "root",
      path: undefined,
      index: true,
      caseSensitive: undefined,
      module: route1
    }
  };
  export const assets = {"version":"5578669f783de497","url":"/build/manifest-5578669F783DE497.js","entry":{"imports":["/build/lib-react-f52640d9e3520066.js","/build/lib-router-7cf68084ed1b740a.js","/build/709-1e02c8ac2eb87ecb.js","/build/entry.client-18b8a3d2faed38be.js","/build/root-676e1167b05c792e.js"],"module":"/build/entry.client-18b8a3d2faed38be.js"},"routes":{"root":{"id":"root","path":"","module":"/build/root-676e1167b05c792e.js","imports":["/build/lib-react-f52640d9e3520066.js","/build/lib-router-7cf68084ed1b740a.js","/build/709-1e02c8ac2eb87ecb.js"],"hasAction":false,"hasLoader":true,"hasCatchBoundary":false,"hasErrorBoundary":false},"routes/_index":{"id":"routes/_index","parentId":"root","index":true,"module":"/build/routes/_index-734a73eaeb74f139.js","imports":["/build/lib-react-f52640d9e3520066.js","/build/lib-router-7cf68084ed1b740a.js","/build/709-1e02c8ac2eb87ecb.js"],"hasAction":false,"hasLoader":true,"hasCatchBoundary":false,"hasErrorBoundary":false}}};
  export const future = {"v3_fetcherPersist":false};
  export const publicPath = "/build/";
