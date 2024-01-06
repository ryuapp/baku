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
import { Router } from "https://deno.land/x/baku/mod.ts";

// create a router object, `new` is not needed
const router = Router();

// handle a GET request and return a TEXT response
router.get("/", () => new Response("Hello Baku!"));

// capture path parameters and return a JSON response
router.get("/user/:id", (req) => {
  return new Response(`Your id is ${req.params?.id}`);
});

// return a primitive Response object
router.get("/money", () => new Response("Payment required", { status: 402 }));

// capture path parameters with RegExp
router.get("/post/:date(\\d+)/:title([a-z]+)", (req) => {
  const { date, title } = req.params as { date: string; title: string };
  return Response.json({ post: { date, title } });
});

// get query parameters
router.get("/search", (req) => {
  const { q } = req.query as { q?: string };
  return new Response(`Your query is ${q}`);
});

// handle a PURGE method and return a Redirect response
router.on("PURGE", "/cache", () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
});

// return client public IP
router.get("/ip", (_req, info) => {
  return new Response(info.remoteAddr.hostname);
});

// return a custom 404 response
router.all("*", () => new Response("Custom 404", { status: 404 }));

Deno.serve(router.handle);
```

## Links

- https://github.com/ryuapp/baku
- https://deno.land/x/baku
