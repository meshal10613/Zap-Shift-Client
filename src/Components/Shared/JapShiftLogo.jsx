import React from 'react';
import logo from '../../assets/assets/logo.png';

const ZapShiftLogo = () => {
    return (
        <div className='flex items-center justify-center gap-0 relative left-7 md:left-0 group hover:cursor-pointer'>
            <img src={logo} alt="" className='absolute right-18 -top-4 w-fit'/>
            <h1 className='text-2xl font-bold'>zapshift</h1>
        </div>
    );
};

export default ZapShiftLogo;