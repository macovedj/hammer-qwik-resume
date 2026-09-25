import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useServerInfo = routeLoader$(() => ({
  renderedAt: new Date().toISOString(),
  runtime: `Node ${process.version}`,
}));

export default component$(() => {
  const info = useServerInfo();
  const count = useSignal(0);
  return (
    <main>
      <p class="eyebrow">SSR + RESUMABILITY</p>
      <h1>Qwik rendered this page on the server.</h1>
      <p class="lede">The counter resumes on interaction without eagerly hydrating the component tree.</p>
      <dl class="facts">
        <div><dt>Rendered</dt><dd>{info.value.renderedAt}</dd></div>
        <div><dt>Runtime</dt><dd>{info.value.runtime}</dd></div>
      </dl>
      <button type="button" onClick$={() => count.value++}>Resumed count: {count.value}</button>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik Resumability Lab",
  meta: [
    {
      name: "description",
      content: "A deterministic Qwik City fixture for edit-test.dev",
    },
  ],
};
