import React from 'react'
import DashboardNav from '../../components/DashboardNav'
import DonationCard from '../../components/DonationCard'

export default function DonorDashboard() {
    return (
        <div>
            <DashboardNav />
            <div className="px-16 py-10 pt-32">
                <div className="flex justify-between">

                    <h1 className='text-3xl font-semibold'>Your Donations</h1>
                    <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-xl text-base px-8 py-4 text-center me-2 mb-2 shadow-lg shadow-orange-400/40">Donate Now</button>
                </div>
                <div className="my-4 grid grid-cols-3 gap-6">
                    <DonationCard />
                    <DonationCard />
                    <DonationCard />
                    <DonationCard />
                </div>
            </div>
        </div>
    )
}
