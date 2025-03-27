import axios from "axios";
import { BASE_URL } from "./const";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;
