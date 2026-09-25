import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  const loadedAt = useSignal("Waiting for browser execution…");
  const count = useSignal(0);
  // This fixture intentionally proves that the value is produced only in the browser.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => { loadedAt.value = new Date().toISOString(); });
  return <main><p class="eyebrow">CLIENT-ONLY EFFECT</p><h1>This value is produced only in the browser.</h1><p class="card">Loaded at: <code>{loadedAt.value}</code></p><button onClick$={() => count.value++}>Client count: {count.value}</button></main>;
});
