import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEye, FaMoneyBillWave, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const MyParcels = () => {
    const {user} = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {data: parcels=[], refetch} = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    const handleDetails = (parcel) => {
        console.log(parcel)
        document.getElementById("my_modal_3").showModal()
    }
    
    const handleDelete = async(id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });
        if (confirm.isConfirmed) {
            try {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })


            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    };

    return (
        <div className="overflow-x-auto p-4 bg-white my-5 md:my-10 mx-3 md:mx-10 rounded-2xl">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th>Cost (৳)</th>
                    <th>Payment</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map((parcel, index) => (
                    <tr key={parcel._id}>
                        <th>{index + 1}</th>
                        <td className='max-w-[180px] truncate'>{parcel.title}</td>
                        <td className="capitalize">{parcel.type}</td>
                        <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                        <td>{parcel.cost}</td>
                        <td>
                            <span
                            className={`badge ${
                                parcel.payment_status === 'paid'
                                ? 'badge-success'
                                : 'badge-error'
                            } text-white`}
                            >
                            {parcel.payment_status}
                            </span>
                        </td>
                        <td className="flex flex-wrap gap-2">
                            <button onClick={() => handleDetails(parcel)} className="btn btn-ghost btn-xs tooltip" data-tip="View">
                                <FaEye className="text-blue-500" size={20}/>
                            </button>
                            {parcel.payment_status === 'unpaid' && (
                            <Link onClick={() => handlePay(parcel._id)} className="btn btn-ghost btn-xs tooltip" data-tip="Pay">
                                <FaMoneyBillWave className="text-green-500" size={20}/>
                            </Link>
                            )}
                            <button onClick={() => handleDelete(parcel._id)} className="btn btn-ghost btn-xs tooltip" data-tip="Delete">
                                <FaTrash className="text-red-500" size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
                {
                    parcels.length === 0 && 
                    <tr>
                        <td colSpan={6} className='text-center text-gray-500 py-6'>
                            No Parcels Found
                        </td>
                    </tr>
                }
                </tbody>
            </table>

            {/*  */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
    );
};

export default MyParcels;