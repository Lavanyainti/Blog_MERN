import axios from "axios";
import {getUser} from '../Utility/getUser'

const axiosInstance=()=>{
    const user=getUser();
    const token=user?.token;

    return axios.create({
         baseURL: "http://localhost:5001/api",
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
}
export default axiosInstance;