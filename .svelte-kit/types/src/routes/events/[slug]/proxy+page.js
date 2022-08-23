import { error } from "@sveltejs/kit";
import { getEvent } from "../../../firebase";

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params: { slug } }) {
  const event = await getEvent(slug);
  if (event) {
    return { event };
  }

  throw error(404, "Not found");
}
