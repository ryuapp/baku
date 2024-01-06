import cleanCSS from "npm:clean-css@5.3.3";

const css = await Deno.readTextFile("docs/styles/markdown.css");
const minCSS = new cleanCSS().minify(css);
await Deno.writeTextFile("docs/styles/markdown.min.css", minCSS.styles);
