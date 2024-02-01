import {
  createResponse,
  json,
  notFound,
  redirect,
  Router,
  text,
} from "../src/mod.ts";

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
