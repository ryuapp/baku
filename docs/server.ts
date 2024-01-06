import { render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import "https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check";
import { Router } from "../mod.ts";

const title = "Baku - A router for Deno";
const description = "Baku is a router for Deno";

const css = await Deno.readTextFile("styles/markdown.min.css");
const markdown = await Deno.readTextFile("pages/index.md");
const body = render(markdown);

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <style>${css}</style>
  </head>
  <body>
    <main class="markdown-body" style="max-width: 768px;margin: 0 auto;">
      ${body}
    </main>
  </body>
</html>
`;

const router = Router();
router.get("/", () => {
  return new Response(html, { headers: { "content-type": "text/html" } });
});
Deno.serve(router.handle);
