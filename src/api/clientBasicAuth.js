import {create} from 'apisauce';
import base64 from "base-64";

const apiClient =(email, password) => create(
    {
        baseURL:"https://fakestoreapi.com/",
        headers:{
            Authorization: "Basic " +base64.encode(email+":"+password)
        }  
    }
);

export default apiClient 