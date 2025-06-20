import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar/>
            <div className='min-h-[calc(100vh-200px)]'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;