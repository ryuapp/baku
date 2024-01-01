// Copyright (c) 2022 - present Yusuke Wada. All rights reserved. MIT license.

export type Handler = (
  request: BakuRequest,
  info: Deno.ServeHandlerInfo,
) => Response | Promise<Response>;

export type BakuRequest = Request & {
  result: URLPatternResult;
  params?: Record<string, string | undefined>;
  query: { [k: string]: string };
};

export type Route = {
  p: URLPattern;
  m: string;
  h: Handler;
};

export type BakuType = {
  routes: Route[];
  fetch: Deno.ServeHandler;
  on: (method: string, path: string, handler: Handler) => void;
} & Methods;

type MethodHandler = (
  path: string,
  handler: Handler,
) => BakuType | Response | Promise<Response>;

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
