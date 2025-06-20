import React from 'react';
import { FaShippingFast, FaGlobeAsia, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";

const services = [
    {
        title: "Express & Standard Delivery",
        description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaShippingFast className="text-4xl" />,
    },
    {
        title: "Nationwide Delivery",
        description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaGlobeAsia className="text-4xl" />,
    },
    {
        title: "Fulfillment Solution",
        description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FaWarehouse className="text-4xl" />,
    },
    {
        title: "Cash on Home Delivery",
        description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyBillWave className="text-4xl" />,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
        "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaBuilding className="text-4xl" />,
    },
    {
        title: "Parcel Return",
        description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndo className="text-4xl" />,
    },
];
const OurServices = () => {
    return (
        <section className="py-20 rounded-2xl my-10 md:my-20 bg-[#03373D]" id="our-services">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-white">Our Services</h2>
                <p className="text-center max-w-2xl mx-auto mb-10 text-gray-400">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    services.map((service, index) => (
                        <div key={index} className="card bg-base-200 shadow-md hover:shadow-lg duration-300 rounded-2xl transition-all hover:bg-[#CAEB66]">
                            <div className="card-body items-center text-center">
                                {service.icon}
                                <h3 className="card-title mt-4">{service.title}</h3>
                                <p className="text-sm">{service.description}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </section>
    );
};

export default OurServices;