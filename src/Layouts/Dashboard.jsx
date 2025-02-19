import { NavLink, Outlet } from "react-router-dom";
import DashboardNav from "../pages/Shared/DashboardNav/DashboardNav";
import { FaPalette, FaReadme, FaUserGroup } from 'react-icons/fa6';
import { FaRegHeart, FaCreditCard, FaHome, FaShoppingCart } from 'react-icons/fa';
import { SiNginxproxymanager } from 'react-icons/si';
import Footer from "../pages/Shared/Footer/Footer";
import { FaDatabase } from "react-icons/fa6";
import useAdminOrCustomer from "../hooks/useAdminOrCustomer";

const Dashboard = () => {
    const [isAdminOrCustomer] = useAdminOrCustomer();
    //console.log(isAdminOrCustomer);
    return (
        <>
            <DashboardNav></DashboardNav>
            <div className={`bg-white text-black`}>

                <div className={`drawer lg:drawer-open`}>
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center overflow-auto my-20">
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className={`menu dasActiveCS p-4 w-72 min-h-full bg-[#0d4b0f] text-base-content`}>
                            {
                                isAdminOrCustomer?.isAdmin &&
                                <>
                                    <NavLink to='/dashboard/adminHome' className="flex text-lg text-white items-center gap-2 mb-2" ><FaPalette /> Dashboard</NavLink>
                                    <NavLink to='/dashboard/adminAllItems' className="flex text-lg text-white items-center gap-2 mb-2" ><FaDatabase /> Manage Products</NavLink>
                                    <NavLink to='/dashboard/users' className="flex text-lg text-white items-center gap-2 mb-2" ><FaUserGroup /> Manage Users</NavLink>
                                    <NavLink to='/dashboard/orders' className="flex text-lg text-white items-center gap-2 mb-2" ><SiNginxproxymanager /> Manage Orders</NavLink>
                                </>
                            }
                            {
                                isAdminOrCustomer?.isCustomer &&
                                <>
                                    <NavLink to='/dashboard/studenthome' className="flex text-lg text-white items-center gap-2 mb-2" ><FaPalette /> Dashboard</NavLink>
                                    <NavLink to='/dashboard/cart' className="flex text-lg text-white items-center gap-2 mb-2" ><FaShoppingCart />My Cart</NavLink>
                                    <NavLink to='/dashboard/wishlist' className="flex text-lg text-white items-center gap-2 mb-2" ><FaRegHeart /> Wish List</NavLink>
                                    <NavLink to='/dashboard/paymentHistory' className="flex text-lg text-white items-center gap-2 mb-2" ><FaCreditCard /> My payment History</NavLink>

                                </>
                            }
                            <div className="divider"></div>
                            <NavLink to='/' className="flex text-lg text-white items-center gap-2 mb-2" ><FaHome /> Home</NavLink>
                            <NavLink to='/cart' className="flex text-lg text-white items-center gap-2 mb-2" ><FaReadme /> Cart</NavLink>

                        </ul>

                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default Dashboard;