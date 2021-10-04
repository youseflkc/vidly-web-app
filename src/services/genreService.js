import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function getGenres() {
  const { data: genres } = await axios.get("/genres");
  return genres;
}
