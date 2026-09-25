import { component$ } from "@builder.io/qwik";
import { routeLoader$, type StaticGenerateHandler } from "@builder.io/qwik-city";

export const onStaticGenerate: StaticGenerateHandler = async () => ({ params: [] });
export const useBuildInfo = routeLoader$(() => ({ builtAt: new Date().toISOString() }));

export default component$(() => {
  const info = useBuildInfo();
  return <main><p class="eyebrow">STATIC GENERATION</p><h1>This route is eligible for build-time generation.</h1><p class="lede">Generated at <code>{info.value.builtAt}</code></p></main>;
});
