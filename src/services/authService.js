import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function login(email, password) {
  const { data: jwt } = await axios.post("/auth", { email, password });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
