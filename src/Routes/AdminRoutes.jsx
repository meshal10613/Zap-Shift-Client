import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router';

const AdminRoutes = ({children}) => {
    const { user, loading } = useAuthContext();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading/>
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoutes;