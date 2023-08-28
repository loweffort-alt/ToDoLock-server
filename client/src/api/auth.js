import instance from "./axios.js";

export const registerRequest = (user) => instance.post(`/register`, user);

export const loginRequest = (user) => instance.post(`/login`, user);

export const verifyTokenRequest = () => instance.get(`/verify`);

export const fetchRegisterRequest = (user) =>
  fetch(`http://localhost:4000/api/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
