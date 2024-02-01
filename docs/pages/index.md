# Baku

Baku - _**\[漠\] means pico in Sinosphere**_ is a router using `URLPattern` for
Deno.

```ts
import { Router } from "https://deno.land/x/baku/mod.ts";

const router = Router();
router.get("/", () => new Response("Hello Baku!"));

Deno.serve(router.handle);
```

## Motivation

Some routing libraies like [Hono](https://github.com/honojs/hono) and
[Oak](https://github.com/oakserver/oak) work on Deno.\
But they aren't desinged for `Deno.serve()`.

Baku is a primitive router designed for that.\
To be accurate, this is an extension of
[Deno.serveHandler](https://deno.land/api?s=Deno.ServeHandler) with built-in
routing.\
Baku fulfills demands like wanting to use
[Deno.ServeHandlerInfo](https://deno.land/api?s=Deno.ServeHandlerInfo).

## Example

```ts
import {
  createResponse,
  json,
  notFound,
  redirect,
  Router,
  text,
} from "https://deno.land/x/baku/mod.ts";

// create a router object, `new` is not needed
const router = Router();

// handle a GET request and return a TEXT response
router.get("/", () => text("Hello Baku"));

// capture path parameters and return a JSON response
router.get("/user/:id", (req) => {
  return text(`Your id is ${req.params?.id}`);
});

// return a primitive Response object
router.get("/money", () => {
  const res = createResponse();
  res.status(402);
  return res.text("Payment required");
});

// capture path parameters with RegExp
router.get("/post/:date(\\d+)/:title([a-z]+)", (req) => {
  const { date, title } = req.params as { date: string; title: string };
  return json({ post: { date, title } });
});

// get query parameters
router.get("/search", (req) => {
  const { q } = req.query as { q?: string };
  return text(`Your query is ${q}`);
});

// handle a PURGE method and return a Redirect response
router.on("PURGE", "/cache", () => redirect("/"));

// return client public IP
router.get("/ip", (_req, info) => {
  return text(info.remoteAddr.hostname);
});

// return a custom 404 response
router.all("*", () => notFound("Custom 404"));

Deno.serve(router.handle);
```

## Links

- https://github.com/ryuapp/baku
- https://deno.land/x/baku
