import axios from 'axios';
import { API_URL } from '../data/constants';


// get review with donor
export const getReviewsByDonorId = async (donorId) => {
    try {

        const responce = await axios.get(`${API_URL}/reviews/${donorId}`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}

