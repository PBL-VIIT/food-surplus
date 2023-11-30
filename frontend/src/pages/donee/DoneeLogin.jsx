import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import MainButton from '../../components/utility/MainButton'
import CustomeInput from '../../components/utility/CustomeInput'
import toast, { Toaster } from "react-hot-toast";
import { loginDonee } from '../../api/donee';

export default function DoneeLogin() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const handleDoneeLogin = () => {
        console.log(email, password);
        if (!email || !password) {
            if (!email)
                toast.error("Email cannot be empty")
            if (!password)
                toast.error("Password cannot be empty")
        } else {
            // making donee login api request
            try {

                let res = loginDonee(email, password)
                console.log(res);
            } catch (error) {

            }
        }
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Toaster />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full shadow-lg bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome Back !
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <CustomeInput value={email} setValue={setEmail} placeholder={"Your email"} id={"email"} type={"email"} />

                            <CustomeInput value={password} setValue={setPassword} placeholder={"••••••••"} id={"password"} type={"password"} />

                            {/* <MainButton to={'/donee/dashboard/'} text={'Create a Donee account'} /> */}
                            <MainButton onClick={handleDoneeLogin} to={'/donee/dashboard/'} text={'Login as Donee'} />



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
