import axios from 'axios';


const transparenciaApi = axios.create({
      // baseURL: 'http://localhost:5190/api-transparencia',
      baseURL: 'http://200.56.97.5:7282/api-transparencia',
   // baseURL:'http://200.56.97.5:7281/api-viaticos'
    
});

export default transparenciaApi; 