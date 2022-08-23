import { getOrganizers } from "../../firebase";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    organizers: await getOrganizers(),
  };
}
