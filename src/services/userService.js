import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function registerUser(user) {
  await axios.post("/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
