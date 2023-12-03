import React, { useState } from 'react'
import CustomeInput from '../components/utility/CustomeInput'
import { Link } from 'react-router-dom'
import MainButton from '../components/utility/MainButton'

export default function EditDonorProfile() {



    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [passwd, setPasswd] = useState()
    const [orgName, setOrgName] = useState()

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [geohash, setGeohash] = useState()

    return (
        <div className="px-16 py-10 pt-32 w-4/5">
            <div className="space-y-4 md:space-y-6" >
                <CustomeInput value={name} setValue={setName} placeholder={"Your Name"} id={"name"} type={"text"} />
                <CustomeInput value={email} setValue={setEmail} placeholder={"Your email"} id={"email"} type={"email"} />
                <CustomeInput value={orgName} setValue={setOrgName} placeholder={"Your organization name"} id={"orgName"} type={"text"} />

                <CustomeInput value={passwd} setValue={setPasswd} placeholder={"••••••••"} id={"password"} type={"password"} />

                <div className="flex gap-x-4">

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
                    type={'text'}
                    name={'Geohash'}
                />


                <MainButton text={'Create a Donor account'} />



            </div>
        </div>
    )
}
