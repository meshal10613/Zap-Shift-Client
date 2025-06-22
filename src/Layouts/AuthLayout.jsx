import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=''>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;