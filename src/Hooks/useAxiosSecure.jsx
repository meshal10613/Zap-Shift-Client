import axios from 'axios';
import React from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const {user, logOut} = useAuthContext();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`

        return config;
    }, error => {
        return Promise.reject(error)
    });

    axiosSecure.interceptors.response.use(res => {
    return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch((error) => { console.log(error) })
    }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;