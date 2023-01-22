import axios from "axios";

const instance = axios.create({
    method: "get",
    baseURL: "http://localhost:4000/api/v1/messages"
})

export default instance;