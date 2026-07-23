import worker from "../dist/server/index.js";

function requestHeaders(headers) {
  const result = new Headers();

  for (const [name, value] of Object.entries(headers)) {
    if (value === undefined || name === "host" || name === "connection") continue;
    result.set(name, Array.isArray(value) ? value.join(", ") : value);
  }

  return result;
}

async function requestBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function requestUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url || "/", `${protocol}://${host}`);
  const path = url.searchParams.get("path");

  if (path !== null) {
    url.pathname = `/${path}`;
    url.searchParams.delete("path");
  }

  return url.toString();
}

export default async function handler(req, res) {
  const response = await worker.fetch(
    new Request(requestUrl(req), {
      method: req.method,
      headers: requestHeaders(req.headers),
      body: await requestBody(req),
      duplex: "half"
    }),
    {
      ASSETS: {
        fetch: request => fetch(request)
      }
    }
  );

  res.statusCode = response.status;
  response.headers.forEach((value, name) => res.setHeader(name, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
