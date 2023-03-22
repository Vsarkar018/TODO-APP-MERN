import axios from "axios";
const instance = axios.create({ baseURL: "https://localhost:5000/api/v1" });

instance.interceptors.request.use(function (config) {
  const user = localStorage.getItem("user");
  console.log("interceptor");
  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  }
  return config;
});
