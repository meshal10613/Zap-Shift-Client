import React from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import { Link, useNavigate } from 'react-router';
import { Bounce, toast } from 'react-toastify';

const MyProfile = () => {
    const {logOut} = useAuthContext();
    const navigate = useNavigate();
    const handleSignOut = () => {
        logOut()
        .then(() => {
            navigate("/");
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
            <Link onClick={handleSignOut} className='px-4 py-2 border border-gray-400 rounded-md font-semibold'>Sign Out</Link>
        </div>
    );
};

export default MyProfile;