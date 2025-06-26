import React from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';


const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const {user} = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const { isPending, data: payments = []  } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });
    console.log(payments)
    if(isPending){
        <Loading/>
    }
    return (
<div className="overflow-x-auto shadow-md my-5 md:my-10 mx-3 md:mx-10 rounded-2xl">
            <table className="table w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Transaction</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments?.length > 0 ? (
                        payments.map((p, index) => (
                            <tr key={p.transactionId}>
                                <td>{index + 1}</td>
                                <td className="truncate" title={p.id}>
                                    {p.id}
                                </td>
                                <td>৳{p.amount}</td>
                                <td className="font-mono text-sm">
                                    <span title={p.transactionId}>
                                        {p.transactionId}
                                    </span>
                                </td>
                                <td>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;