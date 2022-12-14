const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    // console.log(userToken);
    return userToken;
}

const setToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

exports.setToken = setToken;
exports.getToken = getToken;

// import { useState } from 'react';

// export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   return {
//     setToken: saveToken,
//     token
//   }
// }

