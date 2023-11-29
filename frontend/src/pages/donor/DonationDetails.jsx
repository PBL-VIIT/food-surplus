import React, { useEffect, useState } from 'react'
import DashboardNav from '../../components/DashboardNav'
import ReviewCard from '../../components/ReviewCard'
import { useParams, } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { getSingleDonation } from '../../api/donation'
import { getFeedbackByDonation } from '../../api/feedback'
import { getSingleDonor } from '../../api/donor'

export default function DonationDetails() {

    let { donationId } = useParams()

    const [donationDetails, setDonationDetails] = useState()
    const [feedbacks, setFeedbacks] = useState()
    const [donorDetails, setDonorDetails] = useState()

    useEffect(() => {
        const getDonation = async () => {

            let res = await getSingleDonation(donationId)
            let feedback = await getFeedbackByDonation(donationId)

            setDonationDetails(res.data)
            // toast.success(" Donation's details fetched successfully")
            setFeedbacks(feedback.data)
            console.log(feedbacks);


            let donor = await getSingleDonor(res.data.donorId)
            setDonorDetails(donor.data)
            // console.log("donor", donorDetails);
        }
        getDonation()

    }, [])



    return (
        <div>
            <DashboardNav />
            <Toaster />
            <div className="px-16 py-10 pt-32 w-4/5">
                <div className="flex justify-between ">
                    <div className="">
                        <div className="flex">

                            <h1 className='px-2 font-bold text-3xl outline-blue-100 ' >{donationDetails?.donationName}</h1>
                            <p className='rounded-full bg-yellow-200 border border-yellow-400 h-fit px-2 shadow-lg shadow-yellow-200/25'>{donationDetails?.donationType}</p>
                        </div>
                        <p className='px-2 text-gray-800 outline-blue-100 mt-4' >{donationDetails?.donationDescription}</p>
                    </div>
                    <div className="">

                        <p className='p-2 rounded-md border border-red-300 bg-red-100 h-fit'><b>Expiry Date -</b> {donationDetails?.donationExpiry}</p>
                        <p className='text-lg mt-2 border border-gray-300 rounded-md px-2 w-fit shadow-lg bg-green-50 shadow-gray-300/10'>Number of Donations - <span className='text-xl font-bold'>{donationDetails?.noOfDonations}</span></p>
                    </div>

                </div>

                <div className="border w-2/4 shadow-lg shadow-mainColor/10 border-mainColor/25 rounded-lg mt-5 bg-mainColor/5 py-2 px-4">
                    <h1 className='font-semibold text-2xl '>Donor Contact</h1>

                    <div className="mt-3">
                        <div className="text-xs">Donor's Name</div>
                        <h1 className='font-bold'>{donorDetails?.name}</h1>
                    </div>
                    <div className="mt-3">
                        <div className="text-xs">Donor's Rating</div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{donorDetails?.avgRatings}</p>

                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-xs">Donor's Email Address</div>
                        <h1 className='font-bold'>{donorDetails?.email}</h1>
                    </div>
                    <div className="mt-3">
                        <div className="text-xs">Donor's Organization </div>
                        <h1 className='font-bold'>{donorDetails?.orgName}</h1>
                    </div>



                </div>

            </div>


            <hr className="w-[70%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700" />

            <div className="my-20 mt-1">
                <h1 className='px-20 font-semibold text-2xl'>Feedbacks <span className='bg-mainColor
                 px-2 rounded-full h-4 w-4 ml-2'>{feedbacks?.length}</span></h1>
                <div className="">

                    <form>
                        <label htmlFor="chat" className="sr-only">Your message</label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 mx-20 mt-10 border">

                            <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button className="inline-flex justify-center p-2 text-mainColor rounded-full cursor-pointer hover:bg-mainColor/10">
                                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>

                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                </div>
                <div className="my-5 mx-20 overflow-x-scroll flex gap-4 py-10">
                    {feedbacks &&
                        feedbacks?.map((feedback) => (

                            <ReviewCard key={feedback.feedbackTitle} text={feedback.feedbackTitle} description={feedback.feedbackDescription} byUserId={feedback.doneeId} />
                        ))
                    }


                </div>

            </div>


        </div>
    )
}
