// Copyright (c) 2022 - present Yusuke Wada. All rights reserved. MIT license.

import type { BakuType, Handler, Route } from "./types.ts";

export const Router = (): BakuType => {
  const routes: Route[] = [];
  const f: {
    fetch: Handler;
    on: (method: string, path: string, handler: Handler) => void;
  } = {
    fetch: (req, info) => {
      const m = req.method;
      for (const route of routes) {
        const result = route.p.exec(req.url);
        if ((result && route.m === "ALL") || (result && route.m === m)) {
          req.params = result.pathname.groups;
          req.query = result.search.input;
          return route.h(req, info);
        }
      }
      return new Response("Not Found", { status: 404 });
    },
    on: (method, path, handler) => {
      routes.push({
        p: new URLPattern({
          pathname: path,
        }),
        m: method.toUpperCase(),
        h: handler,
      });
    },
  };
  const p = new Proxy({} as BakuType, {
    get: (_, prop: string, receiver) => (...args: unknown[]) => {
      if (prop === "fetch" || prop === "on") {
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        return f[prop](...args);
      }
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      f["on"](prop, ...args);
      return receiver;
    },
  });

  return p as BakuType;
};
