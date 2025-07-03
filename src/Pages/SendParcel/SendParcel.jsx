import { useForm } from "react-hook-form";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from "../../Hooks/useAuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 12).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const {user} = useAuthContext();
    const warehouses = useLoaderData();
    const AxiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const parcelType = watch("type");

const onSubmit = (data) => {
        let weight = parseFloat(data.weight) || 0;
        const isSameDistrict = data.senderRegion === data.receiverRegion;

        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
            weight = 0;
            breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraKg = weight - 3;
                const perKgCharge = extraKg * 40;
                const districtExtra = isSameDistrict ? 0 : 40;
                baseCost = isSameDistrict ? 110 : 150;
                extraCost = perKgCharge + districtExtra;

                breakdown = `
                    Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
                    Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
                    ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
                `;
            }
        }

        const totalCost = baseCost + extraCost;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
            <div class="text-left text-base space-y-2">
                <p><strong>Parcel Type:</strong> ${data.type}</p>
                ${ weight > 0 ? `<p><strong>Weight:</strong> ${weight} kg</p>` : ""}
                <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
                <hr class="my-2"/>
                <p><strong>Base Cost:</strong> ৳${baseCost}</p>
                ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
                <div class="text-gray-500 text-sm">${breakdown}</div>
                <hr class="my-2"/>
                <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
            </div>
    `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#03373D",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingID(),
                };

                console.log("Ready for payment:", parcelData);
                
                AxiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // TODO: redirect to a payment page 
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                            navigate("/dashboard/my-parcels")
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Oops...",
                            text: `${error.message}`,
                            icon: "error",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                
            }
        });
    };


    //unique region
    const uniqueRegion = [...new Set(warehouses.map((w) => w.region))];

    //get district by region
    const getDistrictByRegion = (region) => {
        return warehouses.filter((w) => w.region === region).map((w) => w.district);
    };

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");


    return (
        <div className="max-w-6xl mx-auto p-6 shadow-2xl rounded-lg bg-white">
        <h1 className="text-4xl font-bold text-left text-green-900 mb-2">Add Parcel</h1>
        <p className="text-lg font-semibold text-gray-700 mb-6">Enter your parcel details</p>
        <div className="divider"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Parcel Type and Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="document"
                        defaultChecked
                        {...register("type", { required: true })}
                        className="radio radio-success"
                    />
                    Document
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="non-document"
                        {...register("type", { required: true })}
                        className="radio radio-success"
                    />
                    Not-Document
                    </label>
                    {errors.type && <p className="text-red-500 text-sm ml-2">Required</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                    {...register("title", { required: true })}
                    placeholder="Parcel Name"
                    className="input input-bordered w-full"
                    />
                    {parcelType === "non-document" && (
                    <input
                        {...register("weight")}
                        type="number"
                        placeholder="Parcel Weight (KG)"
                        className="input input-bordered w-full"
                    />
                    )}
                </div>
            </div>

            <div className="divider"></div>

            {/* Sender + Receiver */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Sender */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Sender Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                    <input {...register("senderName", { required: true })} placeholder="Sender Name" value={user?.displayName} className="input input-bordered w-full" readOnly/>
                    <input {...register("senderContact", { required: true })} type="number" placeholder="Sender Contact No" className="input input-bordered w-full" />
                    <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                        <option value="">Select your region</option>
                        {
                            uniqueRegion.map((division, index) => 
                            <option key={index} value={division}>{division}</option>
                            )
                        }
                    </select>
                    <select {...register("senderWarehouse", { required: true })} className="select select-bordered w-full">
                        <option value="">Select Wire house</option>
                        {
                            getDistrictByRegion(senderRegion).map((ware, index) => 
                            <option key={index} value={ware}>{ware}</option>
                            )
                        }
                    </select>
                    <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full col-span-2" />
                    <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="textarea w-full col-span-2" />
                    </div>
                </div>

                {/* Receiver */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Receiver Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                    <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                    <input {...register("receiverContact", { required: true })} type="number" placeholder="Receiver Contact No" className="input input-bordered w-full" />
                    <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                        <option value="">Select your region</option>
                        {
                            uniqueRegion.map((division, index) => 
                            <option key={index} value={division}>{division}</option>
                            )
                        }
                    </select>
                    <select {...register("receiverWarehouse", { required: true })} className="select select-bordered w-full">
                        <option value="">Select Wire house</option>
                        {
                            getDistrictByRegion(receiverRegion).map((ware, index) => 
                            <option key={index} value={ware}>{ware}</option>
                            )
                        }
                    </select>
                    <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full col-span-2" />
                    <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="textarea w-full col-span-2" />
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4">
            <span className="text-sm text-gray-500 italic">⏰ PickUp Time 4pm - 7pm Approx.</span>
            <button type="submit" className="btn bg-lime-300 hover:bg-lime-400 mt-4 md:mt-0">
                Proceed to Confirm Booking
            </button>
            </div>
        </form>
        <ToastContainer />
        </div>
    );
};

export default SendParcel;
