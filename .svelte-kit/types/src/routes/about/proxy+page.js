import { getEvents } from "../firebase";

/** */
export async function load() {
  return {
    events: await getEvents(),
  };
}
