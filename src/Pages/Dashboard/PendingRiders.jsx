import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        }
    });

    if (isPending) {
        return <Loading/>
    };

    const handleDecision = async (id, action, email) => {
        const confirm = await Swal.fire({
            title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            const status = action === "approve" ? "active" : "rejected"
            await axiosSecure.patch(`/riders/${id}/status`, {
                status,
                email
            });

            refetch();

            Swal.fire("Success", `Rider ${action}d successfully`, "success");

        } catch (err) {
            Swal.fire("Error", "Could not update rider status", err);
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pending Rider Applications</h2>

            <div className="overflow-x-auto bg-white rounded-2xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>Warehouse</th>
                            <th>Phone</th>
                            <th>Applied</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.warehouse}</td>
                                <td>{rider.contact}</td>
                                <td>{new Date(rider.creationTime).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-sm"
                                    >
                                        <FaEye className="text-blue-500" size={20}/>
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "approve", rider.email)}
                                        className="btn btn-sm"
                                    >
                                        <FaCheck className="text-green-500" size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "reject", rider.email)}
                                        className="btn btn-sm"
                                    >
                                        <FaTimes className="text-red-500" size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing rider details */}
            {selectedRider && (
                <dialog id="riderDetailsModal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-xl mb-2">Rider Details</h3>
                        <div className="space-y-2 grid grid-cols-2 gap-x-5 gap-y-2">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.contact}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Registration:</strong> {selectedRider.bikeRegNo}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>Warehouse:</strong> {selectedRider.warehouse}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.creationTime).toLocaleString()}</p>
                            {selectedRider.note && <p><strong>Note:</strong> {selectedRider.note}</p>}
                        </div>

                        <div className="modal-action mt-4">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;