import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import ProfileLogout from "../../../components/profileLogout/ProfileLogout";
import useAdminOrCustomer from "../../../hooks/useAdminOrCustomer";
import CartModal from "./carModal";


const Navbar = () => {
    const {user, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isAdminOrCustomer] = useAdminOrCustomer(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
   
    const handleLogout = () => {
        logout()
        .then(() => {
            localStorage.removeItem('flavors-access-token');
        })
        .catch(error => {
            console.log(error)
        })
    }
    const navLinks = <>
        <NavLink to="/" className="font-semibold mr-4">Home</NavLink>
        <button onClick={() => setIsCartOpen(true)} className="font-semibold mr-4">Cart</button>
       
        {
            user ? 
            isAdminOrCustomer?.isAdmin ? <NavLink to="/dashboard/adminHome" className="font-semibold mr-4">Dashboard</NavLink> :
            <NavLink to="/dashboard/customerHome" className="font-semibold mr-4">Dashboard</NavLink> :
            ''
        }
    </>
    return (
        <div>
            <div className="navbar bg-opacity-50 bg-black text-white max-w-screen-xl">
            <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className={`menu activeCs
                    menu-sm dropdown-content mt-3 z-50 flex flex-col ${isOpen ? 'flex' : 'hidden'} p-2 shadow 
                    rounded-box w-52`}>
                        {navLinks}
                    </ul>
                    </div>
                    <a className={`btn btn-ghost normal-case text-3xl`} href="http://localhost:5173/">Flavours</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className={`menu activeCs menu-horizontal px-1 z-10`}>
                    {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                        <ProfileLogout/>
                        <button className='btn' onClick={handleLogout}>Logout</button>
                        </>
                         :
                        <Link to="/login" className="btn">Login</Link>
                    }
                    
                </div>
            </div>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} user={user} syncCartWithDB={() => {}} />
        </div>
    );
};

export default Navbar;