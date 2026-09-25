import { component$, Resource, useResource$ } from "@builder.io/qwik";

export default component$(() => {
  const shellAt = new Date().toISOString();
  const delayed = useResource$<string>(async () => {
    await new Promise((resolve) => setTimeout(resolve, 750));
    return `Resolved at ${new Date().toISOString()}`;
  });
  return <main><p class="eyebrow">STREAMING SSR</p><h1>The shell should arrive first.</h1><p>Shell rendered at <code>{shellAt}</code>.</p><Resource value={delayed} onPending={() => <div class="card">Waiting for the streamed resource…</div>} onResolved={(value) => <div class="card"><strong>The delayed resource arrived.</strong><br /><code>{value}</code></div>} /></main>;
});
