import React from 'react';
import img from '../../assets/assets/bookingIcon.png';

const howItWorks = [
    {
        image: img,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        image: img,
        title: "Cash On Delivery",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        image: img,
        title: "Delivery Hub",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        image: img,
        title: "Booking SME & Corporate",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
]

const HowItWorks = () => {
    return (
        <div className='my-20'>
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                {
                    howItWorks.map((how, index) => 
                    <div data-aos="fade-up" data-aos-duration="2000" key={index} className='bg-white p-10 rounded-2xl space-y-3 w-96 mx-auto shadow-md transition-all hover:shadow-2xl'>
                        <img src={how.image} alt="" />
                        <h2 className='text-xl font-semibold'>{how.title}</h2>
                        <p>{how.description}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default HowItWorks;