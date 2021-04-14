import axios from 'axios';

export const signUpAPI = async (userObject: {
  username: string
  password: string
  name: string
}) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user`, {role: "USER", ...userObject});
    return res.data;
}

export const logInAPI = async (username: string, password: string) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {username, password})
    console.log(res);
}
