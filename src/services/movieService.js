import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

let config = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
};

export async function getMovies() {
  const { data: movies } = await axios.get("/movies");
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await axios.get("/movies/" + id);
  return movie;
}

export async function saveMovie(movie) {
  const id = movie._id;
  movie = {
    title: movie.title,
    genreId: movie.genre._id,
    dailyRentalRate: movie.dailyRentalRate.toString(),
    numberInStock: movie.numberInStock.toString(),
  };

  console.log(movie);

  if (getMovie(id)) await axios.put("/movies/" + id, movie, config);
  else await axios.post("/movies", movie, config);
}

export async function deleteMovie(id) {
  await axios.delete("/movies/" + id);
}

export async function getTotalMovies() {
  const movies = await getMovies();
  return movies.length;
}
