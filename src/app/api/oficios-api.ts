import axios from 'axios';


const oficiosApi = axios.create({
     // baseURL: 'http://localhost:5178/',
     // baseURL: 'http://200.56.97.5:7282/api-transparencia',
   //
   //  baseURL:'http://200.56.97.5:7281/',
   baseURL: 'http://localhost:3001/'
    
});

export default oficiosApi; 