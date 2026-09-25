import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useProduct = routeLoader$(({ params, url }) => ({
  id: params.id,
  requestUrl: url.href,
  renderedAt: new Date().toISOString(),
}));

export default component$(() => {
  const product = useProduct();
  return <main><p class="eyebrow">DYNAMIC SSR</p><h1>Product {product.value.id}</h1><div class="card"><p>Rendered per request at <code>{product.value.renderedAt}</code>.</p><p>URL: <code>{product.value.requestUrl}</code></p></div></main>;
});
