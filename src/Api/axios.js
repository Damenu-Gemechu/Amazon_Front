import axios from  'axios';
const axiosInstance=axios.create({
   // baseURL:"http://localhost:5000"
    baseURL:"https://amazon-backend-o1hw.onrender.com/"

});

export {axiosInstance};