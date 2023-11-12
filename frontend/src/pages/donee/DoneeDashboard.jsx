import React from 'react'
import DonationCard from '../../components/DonationCard'
import DashboardNav from '../../components/DashboardNav'
import DonationCategoryCard from '../../components/DonationCategoryCard'

export default function DoneeDashboard() {
    return (
        <div>
            <DashboardNav />
            <div className="px-16 py-10 pt-32">


                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>

                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search categories of donations" required />

                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-mainColor hover:bg-mainColor/90 focus:ring-4 focus:outline-none focus:ring-mainColor/30 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                </div>



                <h1 className='text-3xl font-semibold mt-10'>Available Donations categories</h1>

                <div className="my-4 grid grid-cols-3 gap-6">
                    <DonationCategoryCard />
                    <DonationCategoryCard />
                    <DonationCategoryCard />
                    <DonationCategoryCard />
                </div>
            </div>

        </div>
    )
}
