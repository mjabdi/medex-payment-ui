import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:9090',
   baseURL: 'https://www.travelpcrtest.com/',
   headers : {
       'Authorization' : 'Basic QXp1cmXEaWFtb45kOmh1bnRlcjO='
   }
 });

 