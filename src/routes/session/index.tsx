import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

export const useName = routeLoader$(({ cookie }) => cookie.get("hammer_name")?.value ?? null);
export const useSetName = routeAction$((data, { cookie, redirect }) => {
  cookie.set("hammer_name", String(data.name ?? "visitor"), { path: "/", httpOnly: true, sameSite: "lax" });
  throw redirect(303, "/session/");
});

export default component$(() => {
  const name = useName();
  const action = useSetName();
  return <main><p class="eyebrow">REQUEST COOKIES</p><h1>{name.value ? `Hello, ${name.value}.` : "No session cookie yet."}</h1><Form action={action}><label for="name">Name</label><input id="name" name="name" required /><button type="submit">Set HttpOnly cookie</button></Form></main>;
});
