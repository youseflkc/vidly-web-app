import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function getMovies() {
  const { data: movies } = await axios.get("/movies");
  return movies;
}

export async function getMovie(id) {
  const movies = await getMovies();
  return movies.find((m) => m._id === id);
}

export async function saveMovie(movie) {
  const id = movie._id;
  movie = {
    title: movie.title,
    genreId: movie.genre._id,
    dailyRentalRate: movie.dailyRentalRate.toString(),
    numberInStock: movie.numberInStock.toString(),
  };

  const movies = await getMovies();
  let i = movies
    .map((m) => {
      return m._id;
    })
    .indexOf(id);

  if (i !== -1) {
    await axios.put("/movies/" + id, movie);
  } else {
    await axios.post("/movies", movie);
  }
}

export async function deleteMovie(id) {
  await axios.delete("/movies/" + id);
}

export async function getTotalMovies() {
  const movies = await getMovies();
  return movies.length;
}
