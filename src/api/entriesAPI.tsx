import axios from 'axios';

export const getEntires = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/entry`)
    return res.data;
}