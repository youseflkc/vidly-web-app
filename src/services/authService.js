import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function login(email, password) {
  return await axios.post("/auth", { email, password });
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
