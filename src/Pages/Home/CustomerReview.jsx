import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import quote from '../../assets/assets/reviewQuote.png'
import image from '../../assets/assets/customer-top.png'

const testimonials = [
    {
        name: 'Awlad Hossin',
        title: 'Verified Buyer',
        message:
        'Incredible delivery speed! I placed my order in the morning and received it the same evening. The packaging was secure, and everything arrived in perfect condition. Highly impressed with the efficiency.',
        photo: 'https://i.pravatar.cc/100?img=1',
    },
    {
        name: 'Rasel Ahamed',
        title: 'Regular Customer',
        message:
        'Consistently reliable service. I’ve been ordering from this platform for months, and they’ve never missed a delivery window. Their customer support is also quick to respond if there are any questions.',
        photo: 'https://i.pravatar.cc/100?img=2',
    },
    {
        name: 'Nasir Uddin',
        title: 'First-Time User',
        message:
        'I was skeptical at first, but my experience turned out amazing. The delivery guy was polite, the items were exactly as listed, and everything was delivered on time. Definitely using it again!',
        photo: 'https://i.pravatar.cc/100?img=3',
    },
    {
        name: 'Shakib Khan',
        title: 'Small Business Owner',
        message:
        'As a business, I need reliable logistics partners—and this service delivers every time. Real-time tracking, affordable rates, and their speed has made a big impact on my day-to-day operations.',
        photo: 'https://i.pravatar.cc/100?img=4',
    },
    {
        name: 'Tahmina Rahman',
        title: 'Busy Professional',
        message:
        'With my hectic schedule, getting essentials delivered to my doorstep has been a game-changer. Their user interface is easy, delivery agents are respectful, and timing is perfect.',
        photo: 'https://i.pravatar.cc/100?img=5',
    },
    {
        name: 'John Smith',
        title: 'Frequent User',
        message:
        'This service has become my go-to for everything from groceries to urgent documents. The notifications are accurate, and I’ve never had a missing item. Really reliable and trustworthy platform.',
        photo: 'https://i.pravatar.cc/100?img=6',
    },
];

const CustomerReviews = () => {
    const [current, setCurrent] = useState(0);
    const [showFullText, setShowFullText] = useState(false);
    const total = testimonials.length;

    const getIndex = (offset) => (current + offset + total) % total;

    const handlePrev = () => {
        setShowFullText(false);
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    const handleNext = () => {
        setShowFullText(false);
        setCurrent((prev) => (prev + 1) % total);
    };

    return (
        <section className="bg-base-100 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
            <img src={image} alt="" className='w-fit mx-auto my-3'/>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">What our customers are saying</h2>
            <p className="text-base-content mb-10 max-w-2xl mx-auto">
            We deliver quality and speed you can trust — see what others say about our services.
            </p>

            {/* Carousel */}
            <div className="relative flex items-center justify-center">
            <div className="flex gap-4 justify-center items-end">
                {[...Array(5)].map((_, i) => {
                const offset = i - 2;
                const index = getIndex(offset);
                const isActive = offset === 0;
                return (
                    <TestimonialCard
                    key={index}
                    testimonial={testimonials[index]}
                    position={offset}
                    isActive={isActive}
                    onClick={() => {
                        if (isActive) {
                        setShowFullText((prev) => !prev);
                        } else {
                        setCurrent(index);
                        setShowFullText(false);
                        }
                    }}
                    showFullText={isActive && showFullText}
                    />
                );
                })}
            </div>
            </div>

            {/* Dots + Arrows */}
            <div className="flex justify-center items-center gap-4 mt-6">
            <button
                onClick={handlePrev}
                className="btn btn-circle btn-sm bg-base-200 text-primary hover:bg-primary hover:text-white"
            >
                <FaArrowLeft />
            </button>

            <div className="flex gap-2">
                {testimonials.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${current === index ? 'bg-primary' : 'bg-base-300'}`}
                    onClick={() => {
                    setCurrent(index);
                    setShowFullText(false);
                    }}
                />
                ))}
            </div>

            <button
                onClick={handleNext}
                className="btn btn-circle btn-sm bg-base-200 text-primary hover:bg-primary hover:text-white"
            >
                <FaArrowRight />
            </button>
            </div>
        </div>
        </section>
    );
};

// Y-position based on offset
const getTranslateY = (position) => {
    switch (position) {
        case -2:
        case 2:
        return 'translate-y-20';
        case -1:
        case 1:
        return 'translate-y-10';
        default:
        return 'translate-y-0';
    }
};

const TestimonialCard = ({ testimonial, position, isActive, onClick, showFullText }) => {
    return (
        <div
        onClick={onClick}
        className={`cursor-pointer card shadow-md p-6 rounded-2xl w-[21rem] h-80 transition-all duration-500 transform ${getTranslateY(
            position
        )} ${isActive ? 'bg-white scale-100 opacity-100 z-10' : 'bg-base-200 scale-95 opacity-50 z-0'}`}
        >
        <div className="flex justify-baseline mb-4">
            {/* <FaQuoteLeft className="text-primary text-2xl" /> */}
            <img src={quote} alt="" />
        </div>

        {/* Scrollable description */}
        <div className={`text-base-content mb-4 text-left pr-2 h-24 overflow-y-auto`}>
            <p className={`${showFullText ? '' : 'line-clamp-4'}`}>{testimonial.message}</p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4 mt-auto">
            <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={testimonial.photo} alt={testimonial.name} />
            </div>
            </div>
            <div className="text-left">
            <p className="font-bold text-neutral">{testimonial.name}</p>
            <p className="text-sm text-base-content">{testimonial.title}</p>
            </div>
        </div>
        </div>
    );
};

export default CustomerReviews;
