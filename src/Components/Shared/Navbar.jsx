import React from 'react';
import { Link, NavLink } from 'react-router';
import ZapShiftLogo from './JapShiftLogo';
import { FaArrowRight } from 'react-icons/fa';
import useAuthContext from '../../Hooks/useAuthContext';
import profileImg from "../../assets/assets/no-img.png";
import LoadingBlank from '../LoadingBlank';

const Navbar = () => {
    const {user, loading} = useAuthContext();
    if(loading){
        return <LoadingBlank/>
    };
    const links = <>
        <li><NavLink to="/">Services</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/sdfg">About Us</NavLink></li>
        <li><NavLink to="/add-percel">Pricing</NavLink></li>
        <li><NavLink to="/be-a-rider">Be a Rider</NavLink></li>
        {
            user && 
            <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>;
    return (
    <div className="navbar bg-white py-5 px-5 md:px-10 rounded-2xl my-5 md:my-10">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="cursor-pointer lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
                <ul 
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow main-link">
                        {links}
                </ul>
            </div>
            <ZapShiftLogo/>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 main-link" data-aos="fade-down" data-aos-duration="2000">
                {links}
            </ul>
        </div>
        <div className="navbar-end gap-3">
            {
                user ?
                <Link to="/my-profile" className="tooltip tooltip-bottom cursor-pointer tooltip-primary text-black">
                    <div className="tooltip-content">
                        <div className="text-black">{user?.displayName}</div>
                    </div>
                    <img src={profileImg} alt="" referrerPolicy='no-referrer' className='w-10 h-10 rounded-full border'/>
                </Link>
                :   
                <div className='flex gap-3'>
                    <Link to="/login" className='px-4 py-2 border border-gray-400 rounded-md font-semibold'>Sign In</Link>
                    <Link to="/register" className='px-4 py-2 rounded-md bg-[#CAEB66] font-semibold hidden md:flex'>Register</Link>
                </div>
            }
            
            <div className='border rounded-full p-1 cursor-pointer bg-black'>
                <FaArrowRight size={25} className='-rotate-45 text-[#CAEB66] transition-all duration-1000 hover:rotate-315'/>
            </div>
        </div>
    </div>
    );
};

export default Navbar;