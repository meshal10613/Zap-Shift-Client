import React, { useState } from 'react';
import { Link } from 'react-router';
import logo from '../../assets/assets/logo.png';
import image from '../../assets/assets/authImage.png'
import { PinInput } from 'react-input-pin-code';

const VerifyCode = () => {
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const handleOTP = (e) => {
        e.preventDefault();
        const join = values.join();
        const number = Number(join.replaceAll(",",""));
        console.log(number)
    };

    return (
        <div>
            <div className='flex items-center justify-around min-h-screen'>
                <div className='flex-1 md:pl-20 flex flex-col items-center justify-center'>
                    <Link to="/" className='flex items-center justify-baseline gap-0 group hover:cursor-pointer mb-5'>
                        <img src={logo} alt="" className='w-fit'/>
                        <h1 className='text-2xl font-bold relative right-4 top-2'>zapshift</h1>
                    </Link>
                    <div className='flex-1'>
                        {/* Login Page */}
                        <div className='md:max-w-md mx-5 md:mx-auto space-y-3'>
                            <h2 className='text-5xl font-bold'>Enter Code</h2>
                            <p>Enter 6 digit code that we sent in your email address</p>
                            <form onSubmit={handleOTP} className='flex flex-col space-y-3'>
                                <PinInput
                                    required
                                    name='otp'
                                    type='number'
                                    size='lg'
                                    values={values}
                                    autoFocus={true}
                                    autoTab={true}
                                    placeholder='0'
                                    onChange={(value, index, values) => setValues(values)}
                                />
                                <button type='sumbit' className='px-4 py-2 rounded-md bg-[#CAEB66] font-semibold cursor-pointer'>Verify Code</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='bg-[#F2FADA] flex-1 min-h-screen md:flex items-center justify-center hidden'>
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;