import axios from "axios";
import config from "../config.json";
import jwtDecode from "jwt-decode";

export async function login(email, password) {
  return await axios.post(config.apiEndpoint + "/auth", { email, password });
}

export function logout() {
  localStorage.removeItem("token");
}

export async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
