import React from 'react';
import { Link, useRouteError } from 'react-router';
import errorJson from '../assets/animations/error.json'
import Lottie from 'lottie-react';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar/>
            <div className='bg-white rounded-2xl flex flex-col items-center justify-center gap-1 py-10'>
                <Lottie animationData={errorJson} loop={true} className='w-fit'/>
                <p>{error.error.message}</p>
                <h2 className='text-4xl font-bold'>Error {error.status}</h2>
                <Link to="/" className='btn bg-[#CAEB66] rounded-md font-semibold'>Go Home</Link>
            </div>
            <Footer/>
        </div>
    );
};

export default ErrorPage;