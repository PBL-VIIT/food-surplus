import React, { useState } from 'react'
import DashboardNav from '../../components/DashboardNav'
import CustomeInput from '../../components/utility/CustomeInput'
import MainButton from '../../components/utility/MainButton'

export default function NewDonation() {

    const [donationName, setDonationName] = useState('');
    const [donationType, setDonationType] = useState('');
    const [noOfDonations, setNoOfDonations] = useState('');
    const [donationDescription, setDonationDescription] = useState('');
    const [donationExpiry, setDonationExpiry] = useState('');
    const [donationPickupLatitude, setDonationPickupLatitude] = useState('');
    const [donationPickupLongitude, setDonationPickupLongitude] = useState('');
    const [donationPickupGeohash, setDonationPickupGeohash] = useState('');


    return (
        <div>
            <DashboardNav />
            <div className="px-16 py-10 pt-32 w-4/5">
                <h1 className='font-semibold text-2xl'>Create new donation</h1>


                <CustomeInput label={"Donation Name"} placeholder={"Enter Donation Name"} type={"text"} />


                <CustomeInput
                    label={'Donation Type'}
                    placeholder={'Enter Donation Type'}
                    type={'text'}
                    name={'donationType'}

                />

                <CustomeInput
                    label={'Donation Description'}
                    placeholder={'Enter Donation Description'}
                    type={'text'}
                    name={'donationDescription'}
                />
                <div className="flex gap-4">

                    <CustomeInput
                        label={'Donation Expiry'}
                        placeholder={'Enter Donation Expiry'}
                        type={'date'}
                        name={'donationExpiry'}
                    />
                    <CustomeInput
                        label={'Number of Donations'}
                        placeholder={'Enter Number of Donations'}
                        type={'number'}
                        name={'noOfDonations'}
                    />
                </div>
                <div className="flex gap-4">

                    <CustomeInput
                        label={'Pickup Latitude'}
                        placeholder={'Enter Pickup Latitude'}
                        type={'text'}
                        name={'donationPickupLatitude'}
                    />
                    <CustomeInput
                        label={'Pickup Longitude'}
                        placeholder={'Enter Pickup Longitude'}
                        type={'text'}
                        name={'donationPickupLongitude'}
                    />
                </div>


                <CustomeInput
                    label={'Pickup Geohash'}
                    placeholder={'Enter Pickup Geohash'}
                    type={'text'}
                    name={'donationPickupGeohash'}
                />

                <div className="w-fit">

                    <MainButton extraClasse={"mt-4 "} text={"Add new donation"} />
                </div>
            </div>
        </div>
    )
}
