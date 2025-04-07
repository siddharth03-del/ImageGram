import axios from "axios";
const axios_instance = axios.create({
    baseURL : "https://imagegram-i7s5.onrender.com"
})
export default axios_instance;