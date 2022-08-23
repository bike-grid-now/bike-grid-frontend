import { error } from "@sveltejs/kit";
import { getEvent } from "../../../firebase";

/** @type {import('./$types').PageLoad} */
export async function load({ params: { slug } }) {
  const event = await getEvent(slug);
  if (event) {
    return {
      event: {
        ...event,
        date: event.date.toDate(),
      },
    };
  }

  throw error(404, "Not found");
}
