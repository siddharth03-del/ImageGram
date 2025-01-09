import axios from "axios";
const axios_instance = axios.create({
    baseURL : "https://imagegram03.onrender.com/api/v1"
})
export default axios_instance;