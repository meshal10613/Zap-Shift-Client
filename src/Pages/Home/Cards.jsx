import React from 'react';
import img1 from "../../assets/assets/live-tracking.png";
import img2 from "../../assets/assets/safe-delivery.png";
import img3 from "../../assets/assets/safe-delivery.png";

const cards = [
    {
        img: img1,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
        img: img2,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
        img: img3,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
];

const Cards = () => {
    return (
        <section className="py-12 border-y-2 border-gray-400 border-dashed">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
                <div className="flex flex-col gap-6">
                {
                    cards.map((card, index) => (
                        <div data-aos="fade-left" data-aos-duration="2000" key={index} className="flex flex-col md:flex-row md:gap-5 xl:gap-10 bg-white p-5 md:p-10 rounded-2xl items-center">
                            <figure className='pb-5'>
                                <img src={card.img} alt={card.title} className="w-fit" />
                            </figure>
                            {/* <div className="divider md:divider-horizontal"></div> */}
                            <div className="card-body space-y-3 pt-5 border-t-2 md:border-t-0 md:pl-10 md:border-l-2 border-gray-400 border-dashed">
                                <h3 className="text-2xl font-semibold mt-4">{card.title}</h3>
                                <p className="text-sm">{card.description}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </section>
    );
};

export default Cards;