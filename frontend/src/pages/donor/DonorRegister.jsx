import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainButton from '../../components/utility/MainButton'
import CustomeInput from '../../components/utility/CustomeInput'
import toast from 'react-hot-toast'
import { registerDonor } from '../../api/donor'

export default function DonorRegister() {



    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [passwd, setPasswd] = useState()
    const [orgName, setOrgName] = useState()

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [geohash, setGeohash] = useState()

    const navigate = useNavigate()

    const donor = localStorage.getItem('donor');
    useEffect(() => {
        if (donor) {
            navigate("/donor/dashboard");
        }

    }, [])

    const handleDonorRegister = async () => {
        if (!name || !email || !passwd || !latitude || !longitude || !geohash) {

            toast.error("Please enter all the fields")
        } else {
            let avgRatings = 0.0
            let res = await registerDonor(name, orgName, email, passwd, latitude, longitude, geohash, avgRatings)
            try {
                if (res.status === 201) {
                    toast.success("Register sucessful")

                    localStorage.setItem('donor', JSON.stringify(res.data));
                    setTimeout(() => {
                        navigate("/donee/dashboard");
                    }, 2000);
                }
                console.log(res);

            } catch (error) {
                toast.error("Error while calling api" + error)
            }
        }


    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <CustomeInput value={name} setValue={setName} placeholder={"Your Name"} id={"name"} type={"text"} />
                            <CustomeInput value={email} setValue={setEmail} placeholder={"Your email"} id={"email"} type={"email"} />
                            <CustomeInput value={orgName} setValue={setOrgName} placeholder={"Your organization name"} id={"orgName"} type={"text"} />

                            <CustomeInput value={passwd} setValue={setPasswd} placeholder={"••••••••"} id={"password"} type={"password"} />

                            <div className="flex gap-4">

                                <CustomeInput
                                    value={latitude}
                                    setValue={setLatitude}
                                    label={'Latitude'}
                                    placeholder={'Enter latitude'}
                                    type={'number'}
                                    name={'Latitude'}
                                />
                                <CustomeInput
                                    value={longitude}
                                    setValue={setLongitude}
                                    label={'Longitude'}
                                    placeholder={'Enter lotitude'}
                                    type={'number'}
                                    name={'Latitude'}
                                />

                            </div>
                            <CustomeInput
                                value={geohash}
                                setValue={setGeohash}
                                label={'Geohash'}
                                placeholder={'Enter geohash'}
                                type={'number'}
                                name={'Geohash'}
                            />


                            <MainButton onClick={handleDonorRegister} to={'/donor/dashboard/'} text={'Create a Donor account'} />


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
