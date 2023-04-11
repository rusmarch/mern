import axios from 'axios';

const API_URL = '/api/users';

// Register user
const registerUser = async (userData) => {
   const response = await axios.post(API_URL, userData);

   if(response.data) {
      localStorage.setItem('user', JSON.stringify(userData));
   }

   return response.data;
}




export const authService = {
   registerUser,
}