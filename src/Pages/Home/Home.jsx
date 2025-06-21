import React from 'react';
import Banner from './Banner';
import OurServices from './OurServices';
import ClientLogos from './ClientLogos';
import Cards from './Cards';
import HowItWorks from './HowItWorks';
import Marchent from './Marchent';
import Faq from './Faq';
import CustomerReviews from './CustomerReview';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <ClientLogos/>
            <Cards/>
            <Marchent/>
            <CustomerReviews/>
            <Faq/>
        </div>
    );
};

export default Home;