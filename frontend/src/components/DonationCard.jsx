import React from 'react'
import { Link } from 'react-router-dom'

export default function DonationCard({ donationName, donationDescription, donationId }) {
    return (
        <div className="max-w-sm p-6 bg-mainColor/5 border-2 border-mainColor/10 rounded-lg shadow hover:border-2 hover:border-mainColor">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{donationName}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{donationDescription}</p>
            <Link to={`/donor/dashboard/donationDetails/${donationId}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-mainColor border-2 border-mainColor hover:bg-mainColor/5  shadow-lg shadow-mainColor/30 rounded-lg focus:ring-4 focus:outline-none focus:ring-orange-300">
                Know more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>

    )
}
