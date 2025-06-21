import React from 'react';
import img1 from '../../assets/assets/location-merchant.png';
import img2 from '../../assets/assets/be-a-merchant-bg.png'
import { Link } from 'react-router';

const Marchent = () => {
    return (
        <div className='bg-[#03373D] my-10 md:my-20 p-5 md:p-20 rounded-2xl flex flex-col-reverse md:flex-row items-center justify-center gap-20 relative'>
            <div className='space-y-5 md:w-[60%]'>
                <h2 className='text-5xl font-bold text-black'>Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className='text-gray-400'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='flex gap-2'>
                    <Link data-aos="fade-right" data-aos-duration="2000" className='btn rounded-3xl bg-[#CAEB66] font-semibold'>Become a Merchent</Link>
                    <Link data-aos="fade-left" data-aos-duration="2000" className='btn rounded-3xl border bg-[#03373D] border-[#CAEB66] text-[#CAEB66]'>Earn with Zapshift Courier</Link>
                </div>
            </div>
            <div>
                <img src={img1} alt="" />
            </div>
            <div className='absolute top-0'>
                <img src={img2} alt="" />
            </div>
        </div>
    );
};

export default Marchent;