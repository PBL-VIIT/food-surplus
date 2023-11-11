import React from 'react'

import { Link } from 'react-router-dom'
import MainButton from '../../components/utility/MainButton'
import CustomeInput from '../../components/utility/CustomeInput'
export default function DoneeLogin() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full shadow-lg bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome Back !
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <CustomeInput placeholder={"Your email"} id={"email"} type={"email"} />

                            <CustomeInput placeholder={"••••••••"} id={"password"} type={"password"} />

                            <MainButton to={"/donor/dashboard/"} text={'Create a Donee account'} />



                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link to={'/donee_register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
