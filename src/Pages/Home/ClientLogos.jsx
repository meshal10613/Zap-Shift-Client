import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from "../../assets/assets/brands/amazon.png";
import logo2 from "../../assets/assets/brands/start-people 1.png";
import logo3 from "../../assets/assets/brands/casio.png";
import logo4 from "../../assets/assets/brands/moonstar.png"
import logo5 from "../../assets/assets/brands/randstad.png"
import logo6 from "../../assets/assets/brands/amazon_vector.png"
import logo7 from "../../assets/assets/brands/start.png"

const clientLogos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
];

const ClientLogos = () => {
    return (
        <section className="py-12 overflow-hidden">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">We've helped thousands of sales teams</h2>
                <div className="relative w-full">
                {/* <div className="flex gap-8 animate-slide"> */}
                <Marquee gradient={false} loop={0} speed={30} pauseOnHover={false}>
                    {
                        clientLogos.map((logo, index) => (
                            <div key={index} className="flex-shrink-0 mx-5 md:mx-10 xl:mx-20">
                                <img src={logo} alt={`Client ${index + 1}`} className="" />
                            </div>
                        ))
                    }
                </Marquee>
                {/* </div> */}
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;