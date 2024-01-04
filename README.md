> [!IMPORTANT]\
> This project is still experimental. The API might be changed.

# Baku

Baku - _**\[漠\] means pico in Sinosphere**_ is a router using `URLPattern` for
Deno.

This is created from [Pico](https://github.com/yusukebe/pico).

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

## Related

- [Pico](https://github.com/yusukebe/pico) - Origin
- [Hono](https://github.com/honojs/hono) - Origin of origin
