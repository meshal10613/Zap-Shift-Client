import React from 'react';
import { FaBoxOpen, FaCheckCircle, FaHome, FaMoneyCheckAlt, FaMotorcycle, FaSearchLocation, FaTasks, FaUserCheck, FaUserClock, FaUserEdit, FaUserShield, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';
import useUserRole from '../Hooks/useUserRole';

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
            {/* Navbar */}
                <div className="navbar bg-base-300 w-full md:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 md:hidden">Dashboard</div>
                </div>
                {/* page content here */}
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 main-link">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" />
                            My Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-parcels">
                            <FaBoxOpen className="inline-block mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/payment-history">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track-parcel">
                            <FaSearchLocation className="inline-block mr-2" />
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="inline-block mr-2" />
                            Update Profile
                        </NavLink>
                    </li>
                    {/* Rider Links */}
                    {
                        !roleLoading && role === 'rider' && 
                        <>
                            <li>
                                <NavLink to="/dashboard/my-earnings">
                                    <FaWallet className="inline-block mr-2" />
                                    My Earnings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-deliveries">
                                    <FaTasks className="inline-block mr-2" />
                                    Pending Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/completed-deliveries">
                                    <FaCheckCircle className="inline-block mr-2" />
                                    Completed Deliveries
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* Admin Links */}
                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <FaUserCheck className="inline-block mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/dashboard/deactivate-riders">
                                    <FaUserShield className="inline-block mr-2" />
                                    Deactivate Riders
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <FaUserClock className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-admin">
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;