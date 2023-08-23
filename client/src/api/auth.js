import axios from "axios";

const API = "http://localhost:3000/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = (user) => axios.post(`${API}/login`, user);

export const fetchRegisterRequest = (user) =>
  fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
