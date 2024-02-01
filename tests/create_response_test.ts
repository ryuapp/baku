import { createResponse } from "../src/create_response.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("text", () => {
  const res = createResponse();
  assertEquals(res.text("hello").headers.get("content-type"), "text/plain");
});

Deno.test("html", () => {
  const res = createResponse();
  assertEquals(res.html("hello").headers.get("content-type"), "text/html");
});

Deno.test("json", () => {
  const res = createResponse();
  assertEquals(res.json({}).headers.get("content-type"), "application/json");
});

Deno.test("notFound", () => {
  const res = createResponse();
  assertEquals(res.notFound().status, 404);
});

Deno.test("redirect", () => {
  const res = createResponse();
  assertEquals(res.redirect("/").status, 302);
});

Deno.test("redirect with status", () => {
  const res = createResponse();
  assertEquals(res.redirect("/", 301).status, 301);
});

Deno.test("status", () => {
  const res = createResponse();
  res.status(201);
  assertEquals(res.body("hello").status, 201);
});
Deno.test("header", () => {
  const res = createResponse();
  res.header("x-hoge", "fuga");
  assertEquals(res.body("hello").headers.get("x-hoge"), "fuga");
});
Deno.test("duplicate header", () => {
  const res = createResponse();
  res.header("content-type", "fuga");
  assertEquals(res.text("hello").headers.get("content-type"), "text/plain");
});
