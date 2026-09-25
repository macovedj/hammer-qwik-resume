import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

const notes = ["This list lives in the server process."];
export const useNotes = routeLoader$(() => notes);
export const useAddNote = routeAction$((data) => {
  const note = String(data.note ?? "").trim();
  if (note) notes.push(note);
  return { ok: true };
});

export default component$(() => {
  const list = useNotes();
  const action = useAddNote();
  return <main><p class="eyebrow">SERVER ACTION</p><h1>POST, mutate, revalidate.</h1><Form action={action}><label for="note">New server-side note</label><input id="note" name="note" required /><button type="submit">Add note</button></Form><ul>{list.value.map((note, index) => <li key={`${note}-${index}`}>{note}</li>)}</ul></main>;
});
