// Copyright (c) 2022 - present Yusuke Wada. All rights reserved. MIT license.

export type ServeHandler = (
  request: BakuRequest,
  info: Deno.ServeHandlerInfo,
) => Response | Promise<Response>;

export type BakuRequest = Request & {
  result: URLPatternResult;
  params: Record<string, string | undefined>;
  query: { [k: string]: string };
};

export type Route = {
  p: URLPattern;
  m: string;
  h: ServeHandler;
};

export type BakuType = {
  routes: Route[];
  handle: Deno.ServeHandler;
  on: (method: string, path: string, handler: ServeHandler) => void;
} & Methods;

type MethodHandler = (
  path: string,
  handler: ServeHandler,
) => Response | Promise<Response>;

type Methods = {
  all: MethodHandler;
  get: MethodHandler;
  put: MethodHandler;
  post: MethodHandler;
  delete: MethodHandler;
  head: MethodHandler;
  patch: MethodHandler;
  option: MethodHandler;
};
