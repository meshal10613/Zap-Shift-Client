import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Banner1 from '../../assets/assets/banner/banner1.png';
import Banner2 from '../../assets/assets/banner/banner2.png';
import Banner3 from '../../assets/assets/banner/banner3.png';


const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} interval={2000} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                <div>
                    <img src={Banner1} />
                </div>
                <div>
                    <img src={Banner3} />
                </div>
                <div>
                    <img src={Banner2} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;