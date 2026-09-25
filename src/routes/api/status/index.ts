import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ json, request }) => {
  json(200, { ok: true, method: request.method, runtime: process.version, timestamp: new Date().toISOString() });
};
