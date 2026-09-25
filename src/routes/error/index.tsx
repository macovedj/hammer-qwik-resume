import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useFailure = routeLoader$(() => {
  throw new Error("Intentional Qwik fixture failure");
});

export default component$(() => {
  useFailure();
  return null;
});
