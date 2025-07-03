import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import { FaUserSlash } from 'react-icons/fa';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    // 🟡 Load Active Riders with React Query
    const { isPending, isLoading, data: riders = [], refetch, error } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        }
    });

    if (isPending) {
        return <Loading/>
    };

    // 🔴 Handle Deactivation
    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
        title: "Deactivate this rider?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate",
        cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, { status: "deactivated"});
            Swal.fire("Done", "Rider has been deactivated", "success");
            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to deactivate rider", "error");
        }
    };

    // 🔎 Filtered List
    const filteredRiders = riders.filter((rider) =>
        rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

                {/* 🔍 Search Field */}
                <div className="mb-4 flex items-center gap-2">
                    <input
                    type="text"
                    placeholder="Search by name"
                    className="input input-bordered w-full max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 🌀 Loading/Error */}
            {isLoading && <p className="text-center">Loading active riders...</p>}
            {error && <p className="text-center text-red-500">Failed to load riders</p>}

            {/* 📊 Rider Table */}
            {!isLoading && !error && (
            <div className="overflow-x-auto bg-white rounded-3xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Bike</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRiders.map((rider) => (
                            <tr key={rider._id}>
                            <td>{rider.name}</td>
                            <td>{rider.email}</td>
                            <td>{rider.contact}</td>
                            <td>{rider.region}</td>
                            <td>{rider.warehouse}</td>
                            <td>{rider.bikeBrand} - {rider.bikeRegNo}</td>
                            <td><span className="badge badge-success text-white">Active</span></td>
                            <td>
                                <button
                                onClick={() => handleDeactivate(rider._id)}
                                className="btn btn-sm btn-error"
                                >
                                <FaUserSlash className="mr-1" /> Deactivate
                                </button>
                            </td>
                            </tr>
                        ))}
                        {filteredRiders.length === 0 && (
                            <tr>
                            <td colSpan="8" className="text-center text-gray-500">
                                No matching riders found.
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default ActiveRiders;