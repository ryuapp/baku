import { createResponse } from "./create_response.ts";

export { Router } from "./router.ts";

export { createResponse } from "./create_response.ts";
export const body = (body: string) => createResponse().body(body);
export const text = (body: string) => createResponse().text(body);
export const html = (body: string) => createResponse().html(body);
// deno-lint-ignore no-explicit-any
export const json = (body: any) => createResponse().json(body);
export const notFound = (message?: string) =>
  createResponse().notFound(message);
export const redirect = (url: string) => createResponse().redirect(url);
