
import { AxiosAdapter } from "./http/axios.adapter";


export const DbAdapter = new AxiosAdapter({
    baseUrl: 'http://200.56.97.5:7281/api/',
    params: {}
});