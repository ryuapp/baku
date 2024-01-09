import { render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import "https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check";
import { serveDir } from "https://deno.land/std@0.211.0/http/file_server.ts";
import { Router } from "../src/mod.ts";

const title = "Baku - A router for Deno";
const description = "Baku is a router for Deno";

const markdown = await Deno.readTextFile("docs/pages/index.md");
const body = render(markdown);

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <link href="markdown.min.css" rel="stylesheet" />
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
router.get("*", (req) => serveDir(req, { fsRoot: "docs/static", quiet: true }));

Deno.serve(router.handle);
