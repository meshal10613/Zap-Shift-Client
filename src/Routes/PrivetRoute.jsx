import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Components/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const { loading, user } = useAuthContext();
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <Loading/>
    };

    if(!user){
        return <Navigate to="/login" state={location?.pathname}/>
    }else{
        return children;
    }
};

export default PrivetRoute;