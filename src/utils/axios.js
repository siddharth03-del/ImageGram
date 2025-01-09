import axios from "axios";
const axios_instance = axios.create({
    baseURL : "https://imagegram03.onrender.com/ping"
})
export default axios_instance;