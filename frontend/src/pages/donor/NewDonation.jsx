import React from 'react'
import DashboardNav from '../../components/DashboardNav'
import CustomeInput from '../../components/utility/CustomeInput'
import MainButton from '../../components/utility/MainButton'

export default function NewDonation() {
    return (
        <div>
            <DashboardNav />
            <div className="px-16 py-10 pt-32 w-4/5">
                <h1 className='font-semibold text-2xl'>Create new donation</h1>
                <CustomeInput label={"Donation Title"} placeholder={"Enter the title of the donation"} type={"text"} />

                <div className="flex gap-4">

                    <CustomeInput label={"Name"} placeholder={"email"} type={"email"} />
                    <CustomeInput label={"email"} placeholder={"email"} type={"email"} />
                </div>

                <div className="w-fit">

                    <MainButton extraClasse={"mt-4 "} text={"Add new donation"} />
                </div>
            </div>
        </div>
    )
}
