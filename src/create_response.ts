export function createResponse() {
  const headers = new Headers();
  let status = 200;

  return {
    header: (key: string, value: string) => {
      headers.set(key, value);
    },
    status: (code: number) => {
      status = code;
    },
    body: (body: string) =>
      new Response(body, {
        headers: Object.fromEntries(headers),
        status,
      }),
    text: (body: string) =>
      new Response(body, {
        headers: {
          ...Object.fromEntries(headers),
          "content-type": "text/plain",
        },
        status,
      }),
    html: (body: string) =>
      new Response(body, {
        headers: {
          ...Object.fromEntries(headers),
          "content-type": "text/html",
        },
        status,
      }),
    // deno-lint-ignore no-explicit-any
    json: (body: any) =>
      new Response(JSON.stringify(body), {
        headers: {
          ...Object.fromEntries(headers),
          "content-type": "application/json",
        },
        status,
      }),
    notFound: (message?: string) =>
      new Response(message ?? "Not Found", {
        headers: Object.fromEntries(headers),
        status: 404,
      }),
    redirect: (url: string, code?: number) =>
      new Response(null, {
        headers: {
          ...Object.fromEntries(headers),
          location: url,
        },
        status: code ?? 302,
      }),
  };
}
