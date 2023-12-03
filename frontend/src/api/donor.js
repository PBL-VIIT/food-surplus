import axios from 'axios';
import { API_URL } from '../data/constants';



// get single donations
export const getSingleDonor = async (donorId) => {
    try {

        const responce = await axios.get(`${API_URL}/donors/${donorId}`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}

// get single donations
export const loginDonor = async (email, passwd) => {
    try {

        const responce = await axios.post(`${API_URL}/donors/login`, { email: email, passwd: passwd });
        return responce

    } catch (error) {

        console.error('Data fetching failed:', error);
        return error
    }
}

// register donee
export const registerDonor = async (name, orgName, email, passwd, latitude, longitude, geohash, avgRatings) => {
    try {

        const responce = await axios.post(`${API_URL}/donor/register`, { name, orgName, email, passwd, latitude, longitude, geohash, avgRatings });
        return responce

    } catch (error) {
        console.error('Data insert failed:', error);
    }
}