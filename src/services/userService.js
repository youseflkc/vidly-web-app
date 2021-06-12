import axios from "axios";
import config from "../config.json";

export async function registerUser(user) {
  await axios.post(config.apiEndpoint + "/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
