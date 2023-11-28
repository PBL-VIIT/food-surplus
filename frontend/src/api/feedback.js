

import axios from 'axios';
import { API_URL } from '../data/constants';

// get feebacks with donationId
export const getFeedbackByDonation = async (donationId) => {
    try {

        const responce = await axios.get(`${API_URL}/feedbacks/${donationId}`);
        return responce

    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}