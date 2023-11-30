import React, { useState } from 'react'
import MainButton from '../../components/utility/MainButton'
import CustomeInput from '../../components/utility/CustomeInput'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginDonor } from '../../api/donor'

export default function DonorLogin() {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const handleDonorLogin = async () => {
        console.log(email, password);
        console.log(email, password);
        if (!email || !password) {
            if (!email)
                toast.error("Email cannot be empty")
            if (!password)
                toast.error("Password cannot be empty")
        } else {
            // making donee login api request
            try {

                let res = await loginDonor(email, password)
                if (res.status === 200) {
                    toast.success("Login sucessful")
                }
                console.log(res);
            } catch (error) {

            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome back !
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <CustomeInput value={email} setValue={setEmail} placeholder={"Your email"} id={"email"} type={"email"} />

                            <CustomeInput value={password} setValue={setPassword} placeholder={"••••••••"} id={"password"} type={"password"} />



                            <MainButton onClick={handleDonorLogin} to={'/donor/dashboard/'} text={'Login as Donor'} />

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link to={'/donor_register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
