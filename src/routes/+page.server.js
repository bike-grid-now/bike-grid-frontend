import { getEvents } from "$lib/firebase";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    events: await getEvents(),
  };
}
