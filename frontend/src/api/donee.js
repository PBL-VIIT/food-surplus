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