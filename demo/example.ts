import { Router } from "../mod.ts";

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
  const query = new URLSearchParams(req.query).get("q");
  return new Response(`Your query is ${query}`);
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

Deno.serve(router.fetch);
