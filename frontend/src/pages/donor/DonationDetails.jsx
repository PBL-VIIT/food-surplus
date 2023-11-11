import React from 'react'
import DashboardNav from '../../components/DashboardNav'
import ReviewCard from '../../components/ReviewCard'

export default function DonationDetails() {
    return (
        <div>
            <DashboardNav />
            <div className="px-16 py-10 pt-32 w-4/5">
                <h1 className='px-2 font-bold text-3xl outline-blue-100' contentEditable>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit similique molestias sint!</h1>
                <p className='px-2 text-gray-800 outline-blue-100 mt-4' contentEditable>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime eum nihil ab libero vitae dolorem doloremque, temporibus culpa dolores delectus veniam expedita dolor et id dolorum sequi pariatur eos illum porro blanditiis!</p>

            </div>
            <div className="my-20">
                <h1 className='px-20 font-semibold text-2xl'>Feedback</h1>
                <div className="my-5 mx-20 overflow-x-scroll flex gap-4 py-10">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />

                </div>
            </div>
        </div>
    )
}
