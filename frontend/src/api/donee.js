import axios from 'axios';
import { API_URL } from '../data/constants';



// get single donations
export const getSingleDonee = async (donorId) => {
    try {

        const responce = await axios.get(`${API_URL}/donees/${donorId}`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}

// get single donations
export const loginDonee = async (email, passwd) => {
    try {

        const responce = await axios.post(`${API_URL}/donees/login`, { email: email, passwd: passwd });
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}
// register donee
export const registerDonee = async (doneeName, latitude, longitude, geohash, email, passwd) => {
    try {

        const responce = await axios.post(`${API_URL}/donee/register`, { doneeName, latitude, longitude, geohash, email, passwd });
        return responce

    } catch (error) {
        console.error('Data insert failed:', error);
    }
}