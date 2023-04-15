import axios from 'axios';

const API_URL = '/api/users/';


// Register user
const registerUser = async (userData) => {
   const response = await axios.post(API_URL, userData);

   if(response.data) {
      localStorage.setItem('user', JSON.stringify(userData));
   }

   return response.data;
}

// Login user
const loginUser = async (userData) => {
   const response = await axios.post(API_URL + 'login', userData);

   if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
   }

   return response.data;
}

//Logout
const logoutUser = () => localStorage.removeItem('user');


export const authService = {
   registerUser,
   loginUser,
   logoutUser
}
