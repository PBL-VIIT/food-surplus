import axios from 'axios';
import { API_URL } from '../data/constants';


// get all donations
export const getAllDonations = async () => {
    try {

        const responce = await axios.get(`${API_URL}/donations`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}
// get single donations
export const getSingleDonation = async (donationId) => {
    try {

        const responce = await axios.get(`${API_URL}/donations/${donationId}`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}