import React, { useEffect, useState } from 'react'
import DashboardNav from '../../components/DashboardNav'
import DonationCard from '../../components/DonationCard'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { getAllDonations } from '../../api/donation'

export default function DonorDashboard() {

    const [allDonations, setAllDoantions] = useState([])

    useEffect(() => {

        const getDonations = async () => {

            let res = await getAllDonations()
            console.log(res);
            setAllDoantions(res.data)
            toast.success("All Donations fetched successfully")
        }
        getDonations()


    }, [])

    return (
        <div>
            <DashboardNav />
            <Toaster />
            <div className="px-16 py-10 pt-32">
                <div className="flex justify-between">

                    <h1 className='text-3xl font-semibold'>Your Donations</h1>
                    <Link to={'/donor/newDonation'} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-xl text-base px-8 py-4 text-center me-2 mb-2 shadow-lg shadow-orange-400/40">Donate Now</Link>
                </div>
                <div className="my-4 grid grid-cols-3 gap-6">
                    {
                        allDonations.map((donation) => (
                            <DonationCard key={donation.donationId}
                                donationName={donation.donationName} donationDescription={donation.donationDescription}
                                cardType={'donor'}
                                donationId={donation.donationId}
                            />
                        ))
                    }


                </div>
            </div>
        </div>
    )
}
