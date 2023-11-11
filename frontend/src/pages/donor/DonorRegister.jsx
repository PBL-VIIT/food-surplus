import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../../components/utility/MainButton'
import CustomeInput from '../../components/utility/CustomeInput'

export default function DonorRegister() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <CustomeInput placeholder={"Your Name"} id={"name"} type={"text"} />
                            <CustomeInput placeholder={"Your email"} id={"email"} type={"email"} />

                            <CustomeInput placeholder={"••••••••"} id={"password"} type={"password"} />

                            <MainButton text={'Create a Donor account'} />


                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={'/donor_login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login as Donor</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
