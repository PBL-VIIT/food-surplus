import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomeInput from '../../components/utility/CustomeInput'
import MainButton from '../../components/utility/MainButton'

export default function DoneeRegister() {



    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const handleDoneeRegister = () => {
        console.log(name, email, password);
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full  shadow-lg bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <CustomeInput value={name} setValue={setName} placeholder={"Your Name"} id={"name"} type={"text"} />
                            <CustomeInput value={email} setValue={setEmail} placeholder={"Your email"} id={"email"} type={"email"} />

                            <CustomeInput value={password} setValue={setPassword} placeholder={"••••••••"} id={"password"} type={"password"} />

                            <MainButton onClick={handleDoneeRegister} to={'/donee/dashboard/'} text={'Create a Donee account'} />


                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={'/donee_login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login as Donee</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
