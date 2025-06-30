import axios from 'axios';
import React from 'react';
import useAuthContext from './useAuthContext';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const {user} = useAuthContext();
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`

        return config;
    }, error => {
        return Promise.reject(error)
    });

    return axiosSecure;
};

export default useAxiosSecure;