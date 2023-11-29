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