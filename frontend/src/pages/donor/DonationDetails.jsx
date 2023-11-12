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
