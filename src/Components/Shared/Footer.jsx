import React from 'react';
import { NavLink } from 'react-router';
import ZapShiftLogo from './JapShiftLogo';
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
    <footer className="footer footer-horizontal footer-center bg-black text-neutral-content p-10 rounded-2xl my-5 md:my-10">
        <aside>
            <ZapShiftLogo/>
            <p className='max-w-3xl mx-auto text-gray-400'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
        </aside>
        <div>
            <ul className='flex gap-3'>
                <li><NavLink to="/">Services</NavLink></li>
                <li><NavLink to="/coverage">Coverage</NavLink></li>
                <li><NavLink to="/">About Us</NavLink></li>
                <li><NavLink to="/add-percel">Pricing</NavLink></li>
                <li><NavLink to="/be-a-rider">Be a Rider</NavLink></li>
            </ul>
        </div>
        <nav>
            <div className="grid grid-flow-col gap-4">
                <a href="https://www.linkedin.com/in/10613-meshal" target='_blank'><FaFacebook size={25} className='text-blue-500'/></a>
                <a href="https://www.facebook.com/meshal.67/" target='_blank'><FaLinkedin size={25} className='text-blue-500'/></a>
                <a href="https://github.com/meshal10613" target='_blank'><FaGithub size={25}/></a>
                <a href="https://www.youtube.com/@MESHAL-o3h" target='_blank'><FaYoutube size={25} className='text-red-600'/></a>
            </div>
        </nav>
    </footer>
    );
};

export default Footer;