import axios, { AxiosInstance } from "axios"
import { BASE_URL } from "./const"

export const createAPI = (baseURL = BASE_URL): AxiosInstance => {
  const api = axios.create({
    baseURL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  })
  return api
}

export const api = createAPI()
