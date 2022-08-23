import { getEvents } from "../firebase";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    events: await getEvents(),
  };
}
