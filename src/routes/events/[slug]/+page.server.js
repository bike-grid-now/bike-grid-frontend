import { error } from "@sveltejs/kit";
import { getEvent } from "$lib/firebase";

/** @type {import('./$types').PageLoad} */
export async function load({ params: { slug } }) {
  const event = await getEvent(slug);
  if (event) {
    return {
      event,
    };
  }

  throw error(404, "Not found");
}
