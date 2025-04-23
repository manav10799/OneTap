import axios from "axios";

export const fetchData = async ()=> {
    const apiUrl = import.meta.env.VITE_BACKEND_URL + "/logs";
    const response = await axios.get(apiUrl);
    return response.data;
}