import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://faiskola.richardkorom.hu/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
