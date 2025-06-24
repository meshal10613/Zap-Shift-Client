import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/assets/logo.png';
import image from '../../assets/assets/authImage.png'

const Forgot = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        navigate("/verify-code")
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
                            <h2 className='text-5xl font-bold'>Forgot Password</h2>
                            <p>Enter your email address and we’ll send you a reset link.</p>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
                                <div className='flex flex-col'>
                                    <label className="label">Email</label>
                                    <input type="email" 
                                    {...register("email", {required: true})} 
                                    aria-invalid={errors.email ? "true" : "false"}
                                    className="input w-full border-2 rounded-md h-10 border-gray-300" placeholder="Email" />
                                        {errors.email?.type === "required" && (
                                            <p role="alert" className='text-red-500'>email is required</p>
                                        )}
                                </div>
                                <button className='px-4 py-2 rounded-md bg-[#CAEB66] font-semibold cursor-pointer'>Send</button>
                            </form>
                            <p className='text-gray-400'>Remember your password? <Link to="/login" className='link link-hover text-[#8FA748]'>Login</Link></p>
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

export default Forgot;