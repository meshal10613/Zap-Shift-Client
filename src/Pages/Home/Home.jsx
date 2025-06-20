import React from 'react';
import Banner from './Banner';
import OurServices from './OurServices';
import ClientLogos from './ClientLogos';
import Cards from './Cards';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <ClientLogos/>
            <Cards/>
        </div>
    );
};

export default Home;