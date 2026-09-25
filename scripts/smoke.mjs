import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const rawPort = process.env.SMOKE_PORT ?? "4382";
const port = Number(rawPort);
assert(Number.isInteger(port) && port > 0 && port <= 65535, `Invalid SMOKE_PORT: ${rawPort}`);
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  "npm",
  ["run", "serve", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
let serverSpawnError;
server.stdout.on("data", (chunk) => (serverLog += chunk));
server.stderr.on("data", (chunk) => (serverLog += chunk));
server.on("error", (error) => (serverSpawnError = error));

function startupError(message) {
  const log = serverLog.trim();
  return new Error(log ? `${message}\n${log}` : message);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (serverSpawnError) throw startupError(`Failed to start the fixture server: ${serverSpawnError.message}`);
    if (server.exitCode !== null || server.signalCode !== null) {
      const status = server.exitCode !== null ? `code ${server.exitCode}` : `signal ${server.signalCode}`;
      throw startupError(`Fixture server exited early with ${status}.`);
    }
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw startupError("Timed out waiting for the fixture server.");
}

try {
  await waitForServer();
  const home = await fetch(origin);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Qwik rendered this page on the server/);

  const product = await fetch(`${origin}/products/42/`);
  assert.equal(product.status, 200);
  assert.match(await product.text(), /Product[\s\S]*42/);

  const client = await fetch(`${origin}/client/`);
  assert.equal(client.status, 200);
  assert.match(await client.text(), /Waiting for browser execution/);

  const api = await fetch(`${origin}/api/status/`).then((response) => response.json());
  assert.equal(api.ok, true);

  const redirect = await fetch(`${origin}/redirect/`, { redirect: "manual" });
  assert.equal(redirect.status, 307);
  assert.equal(redirect.headers.get("location"), "/products/redirected/");
  assert.equal((await fetch(`${origin}/missing/`)).status, 404);
  console.log("Qwik production smoke checks passed.");
} finally {
  server.kill("SIGTERM");
}
