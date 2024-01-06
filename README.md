> [!IMPORTANT]\
> This project is still experimental. The API might be changed.

# Baku

Baku - _**\[漠\] means pico in Sinosphere**_ is a router using `URLPattern` for
Deno.

This is created from [Pico](https://github.com/yusukebe/pico).

```ts
import { Router } from "https://deno.land/x/baku/mod.ts";

const router = Router();
router.get("/", () => new Response("Hello Baku!"));

Deno.serve(router.handle);
```

## Documentation

Visit our [docs](https://baku.deno.dev).

## Related

- [Pico](https://github.com/yusukebe/pico) - Origin
- [Hono](https://github.com/honojs/hono) - Origin of origin
