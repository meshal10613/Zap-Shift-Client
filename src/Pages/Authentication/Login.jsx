import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import logo from '../../assets/assets/logo.png';
import image from '../../assets/assets/authImage.png'
import useAuthContext from '../../Hooks/useAuthContext';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const {loginUser, withGoogle} = useAuthContext();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password)

        loginUser(email, password)
        .then((res) => {
            const user = res.user;
            const serverData = {
                email: email,
                lastSignInTime: user?.metadata?.lastSignInTime,
            };
            console.log(serverData)
            console.log(user);
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

    const handleGoogleLogin = () => {
        withGoogle()
        .then((res) => {
            const user = res.user;
            const serverData = {
                email: user?.email,
                lastSignInTime: user?.metadata?.lastSignInTime,
            };
            console.log(user)
            console.log(serverData)
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
                        <img src={logo} alt="" className='w-fit'/>
                        <h1 className='text-2xl font-bold relative right-4 top-2'>zapshift</h1>
                    </Link>
                    <div className='flex-1'>
                        {/* Login Page */}
                        <div className='md:max-w-md mx-5 md:mx-auto space-y-3'>
                            <h2 className='text-5xl font-bold'>Welcome Back</h2>
                            <p>Login with Zapshift</p>
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
                                <div><Link to="/forgot-password" className="link text-gray-400">Forgot password?</Link></div>
                                <button className='px-4 py-2 rounded-md bg-[#CAEB66] font-semibold cursor-pointer'>Login</button>
                            </form>
                            <p className='text-gray-400'>Don't have an account? <Link to="/register" className='link link-hover text-[#8FA748]'>Register</Link></p>
                            <div className="divider">Or</div>
                            {/* Google */}
                            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] w-full h-10">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
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

export default Login;