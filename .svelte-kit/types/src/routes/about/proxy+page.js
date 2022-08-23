import { getOrganizers } from "../../firebase";

/** */
export async function load() {
  return {
    organizers: await getOrganizers(),
  };
}
