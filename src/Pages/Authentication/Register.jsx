import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/assets/logo.png';
import image from '../../assets/assets/authImage.png'
import image2 from '../../assets/assets/image-upload-icon.png'
import useAuthContext from '../../Hooks/useAuthContext';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { registerUser, updateUserProfile, setUser, withGoogle } = useAuthContext();
    const [profilePic, setProfilePic] = useState("");
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;

        registerUser(email, password)
        .then(async(result) => {
            const user = result.user;
            const updateData = { displayName: name, photoURL: profilePic, };
            const serverData = {
                displayName: name,
                email: email,
                role: "user", //default
                creationTime: user?.metadata?.creationTime,
                lastSignInTime: user?.metadata?.lastSignInTime,
            };
            const userRes = await axiosInstance.post("/users", serverData)
            if(userRes.data.insertedId){
                updateUserProfile(updateData)
                .then(() => {
                    setUser({...user, ...updateData});
                    navigate("/");
                    toast.success(`Sign up successfully`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                })
                .catch((error) => {
                    toast.error(`${error?.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                })
            }
        })
        .catch((error) => {
            toast.error(`${error?.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    };

    const handleImageUpload = async(e) => {
        const photoURL = e.target.files[0];

        const formData = new FormData();
        formData.append("image", photoURL);

        const uploadKey = import.meta.env.VITE_image_upload_key;
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${uploadKey}`, formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        setProfilePic(res.data.data.url);
    };

    const handleGoogleRegister = () => {
        withGoogle()
        .then(async(res) => {
            const user = res.user;
            const serverData = {
                displayName: user?.displayName,
                email: user?.email,
                role: "user", //default
                creationTime: user?.metadata?.creationTime,
                lastSignInTime: user?.metadata?.lastSignInTime,
            };
            const userRes = await axiosInstance.post("/users", serverData)
            if(userRes.data.insertedId || userRes.data.modifiedCount){
                navigate("/");
                toast.success(`Sign ${userRes.data.insertedId ? "up" : "in"} successfully`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        })
        .catch((error) => {
            toast.error(`${error?.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        });
    };

    return (
        <div>
            <div className='flex items-center justify-around min-h-screen'>
                <div className='flex-1 md:pl-20 flex flex-col justify-center'>
                    <Link to="/" className='flex items-center justify-baseline gap-0 group hover:cursor-pointer mb-5 mx-auto'>
                        <img src={logo} referrerPolicy='no-referrer' alt="" className='w-fit'/>
                        <h1 className='text-2xl font-bold relative right-4 top-2'>zapshift</h1>
                    </Link>
                    <div className='flex-1'>
                        {/* Register Page */}
                        <div className='md:max-w-md mx-5 md:mx-auto space-y-3'>
                            <h2 className='text-5xl font-bold'>Create an Account</h2>
                            <p>Register with Zapshift</p>
                            <img src={ profilePic ? profilePic : image2} alt="" className='w-12 h-12 rounded-full'/>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
                                {/* Name */}
                                <div className='flex flex-col'>
                                    <label className="label">Name</label>
                                    <input type="name" 
                                    {...register("name", {required: true})} 
                                    aria-invalid={errors.name ? "true" : "false"}
                                    className="input w-full border-2 rounded-md h-10 border-gray-300" placeholder="Email" />
                                        {errors.email?.type === "required" && (
                                            <p role="alert" className='text-red-500'>name is required</p>
                                        )}
                                </div>
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
                                <div className='flex flex-col'>
                                    <label className="label">Password</label>
                                    <input type="password" 
                                    {...register("password", {required: true, minLength: 6})} 
                                    aria-invalid={errors.password ? "true" : "false"}
                                    className="input w-full border-2 rounded-md h-10 border-gray-300" placeholder="Password" />
                                        {errors.password?.type === "required" && (
                                            <p role="alert" className='text-red-500 mt-1'>password is required{errors.password.message}</p>
                                        )}
                                        {
                                            errors.password?.type === "minLength" && (
                                                <p role="alert" className='text-red-500 mt-1'>password must be 6 characters or longer</p>
                                            )
                                        }
                                </div>
                                {/* File */}
                                {
                                    profilePic ? <></> :
                                    <div className='flex flex-col'>
                                        <input type="file" 
                                        placeholder="Up" onChange={handleImageUpload} className='input w-fit border-2 border-gray-300 cursor-pointer'/>
                                    </div>
                                }
                                <button className='px-4 py-2 rounded-md bg-[#CAEB66] font-semibold cursor-pointer'>Register</button>
                            </form>
                            <p className='text-gray-400'>Don't have an account? <Link to="/login" className='link link-hover text-[#8FA748]'>Login</Link></p>
                            <div className="divider">Or</div>
                            {/* Google */}
                            <button onClick={handleGoogleRegister} className="btn bg-white text-black border-[#e5e5e5] w-full h-10">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Register with Google
                            </button>
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

export default Register;