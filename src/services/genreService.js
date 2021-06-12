import axios from "axios";
import config from "../config.json";

export async function getGenres() {
  const { data: genres } = await axios.get(config.apiEndpoint + "/genres");
  return genres;
}
