# Hammer Qwik Resume

A deterministic Qwik City fixture for testing SSR, serialized state, lazy event loading, and resumability in browser-hosted development environments such as edit-test.dev.

## Requirements

- Node.js 22.12 or newer
- npm

## Coverage

- Qwik City SSR and resumable interaction
- Dynamic route parameters and request URLs
- Static generation hook at `/static/`
- Asynchronous resource rendering at `/slow/`
- Browser-only effect at `/client/`
- Server action at `/form/`
- HttpOnly cookie round-trip at `/session/`
- JSON endpoint at `/api/status/`
- Redirect, 404, and intentional error responses

The fixture uses no database, external API, remote font, or required environment variable.

## Commands

```sh
npm install
npm run dev
npm run build.types
npm run lint
npm run build
npm run test:smoke
npm run preview
```

`npm run test:smoke` builds the production output, starts a preview server, exercises the production HTTP routes, and shuts the server down. Set `SMOKE_PORT` to override its default loopback port of `4382`.
