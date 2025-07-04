import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../../Components/Loading';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../../Forbidden';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if(roleLoading){
        return <Loading/>
    }else if(role === "user"){
        return <UserDashboard/>
    }else if(role === "rider"){
        return <RiderDashboard/>
    }else if(role === "admin"){
        return <AdminDashboard/>
    }else{
        return <Forbidden/>
    };
};

export default DashboardHome;