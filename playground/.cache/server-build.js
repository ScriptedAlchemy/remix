
  import * as entryServer from "/Users/bytedance/dev/remix/playground/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx";
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
  export const assets = {"version":"1867bed47903c501","url":"/build/manifest-1867BED47903C501.js","entry":{"imports":["/build/lib-react-66188ff2c5a06a0f.js","/build/lib-router-a524a71461d2b1ff.js","/build/709-a3f569f183f91c6f.js","/build/entry.client-662028472eb2ddeb.js","/build/lib-polyfill-58f882e5ef7ff609.js","/build/root-90d7f3c69f9b5c77.js"],"module":"/build/entry.client-662028472eb2ddeb.js"},"routes":{"root":{"id":"root","path":"","module":"/build/root-90d7f3c69f9b5c77.js","imports":["/build/lib-react-66188ff2c5a06a0f.js","/build/lib-router-a524a71461d2b1ff.js","/build/lib-polyfill-58f882e5ef7ff609.js","/build/709-a3f569f183f91c6f.js"],"hasAction":false,"hasLoader":true,"hasCatchBoundary":false,"hasErrorBoundary":false},"routes/_index":{"id":"routes/_index","parentId":"root","index":true,"module":"/build/routes/_index-3aebc4e561c22e4a.js","imports":["/build/lib-react-66188ff2c5a06a0f.js","/build/lib-router-a524a71461d2b1ff.js","/build/709-a3f569f183f91c6f.js"],"hasAction":false,"hasLoader":true,"hasCatchBoundary":false,"hasErrorBoundary":false}}};
  export const future = {"v3_fetcherPersist":false};
  export const publicPath = "/build/";
