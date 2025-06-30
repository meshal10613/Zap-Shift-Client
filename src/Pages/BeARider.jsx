import React from 'react';
import riderImage from '../assets/assets/agent-pending.png';
import { useForm } from 'react-hook-form';
import useAuthContext from '../Hooks/useAuthContext';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BeARider = () => {
    const {user} = useAuthContext();
    const warehouses = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const riderData = {
            ...data,
            status: "pending",
            creationTime: new Date().toString()
        };
        axiosSecure.post("/riders", riderData)
        .then((res) => {
            if(res.data.insertedId){
                Swal.fire({
                    title: "Application Submitted",
                    text: "Your application is pending for approval",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
            });
        })
    };
    
    //unique region
    const uniqueRegion = [...new Set(warehouses.map((w) => w.region))];

    //get district by region
    const getDistrictByRegion = (region) => {
        return warehouses.filter((w) => w.region === region).map((w) => w.district);
    };

    const region = watch("region");

    return (
        <div className="mx-auto bg-white rounded-3xl shadow-md p-5 md:p-20 lg:p-24 xl:p-28 2xl:p-32">
            <h1 className="text-4xl font-bold text-secondary mb-4">Be a Rider</h1>
            <p className="text-gray-600 mb-8 w-fit md:w-1/2">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>
            <div className='divider'></div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col md:flex-row gap-4'>
                        <input
                        type="text"
                        placeholder="Your Name"
                        value={user?.displayName}
                        readOnly
                        {...register("name", { required: true })}
                        className="input input-bordered w-full"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={user?.email}
                            readOnly
                            {...register("email", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <input
                            type="number"
                            placeholder="Your age"
                            {...register("age", { required: true })}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="NID No"
                            {...register("nid", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <select
                            {...register("region", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select your region</option>
                            {
                                uniqueRegion.map((division, index) => 
                                <option key={index} value={division}>{division}</option>
                                )
                            }
                        </select>
                        <select
                            {...register("warehouse", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select wire-house</option>
                            {
                                getDistrictByRegion(region) ?
                                getDistrictByRegion(region).map((ware, index) => 
                                <option key={index} value={ware}>{ware}</option>
                                ) : ""
                            }
                        </select>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <input
                            type="text"
                            placeholder="Contact"
                            {...register("contact", { required: true })}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Bike Brand"
                            {...register("bikeBrand", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Bike Registration Number"
                        {...register("bikeRegNo", { required: true })}
                        className="input input-bordered w-full col-span-2"
                    />
                    {errors.age && <p className="text-red-500 text-sm ml-2">Required</p>}
                    <textarea
                        placeholder="Additional Information"
                        {...register("additionalInfo")}
                        className="textarea textarea-bordered w-full col-span-2"
                        rows={3}
                    />
                </div>

                <button className="btn bg-primary text-black w-full">
                Submit
                </button>
            </form>

            {/* Image Section */}
            <div className="">
                <img src={riderImage} alt="Rider" className="w-full" />
            </div>
            </div>
        </div>
    );
};

export default BeARider;