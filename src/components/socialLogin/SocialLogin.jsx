import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    const {googleLogin, isDarkMode} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';
    const handleGoogleLogin = event => {
        event.preventDefault();
        googleLogin()
        .then(result => {
            const loggedUser = result.user;
            const newUser = {
                name: loggedUser?.displayName, 
                email: loggedUser?.email, 
                photo: loggedUser?.photoURL, 
                phone: '',
                address: '',
                role: 'Student',
                gender: ''
            }
            console.log(loggedUser, newUser);
            fetch('https://talk-time-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(() => {
                    navigate(from);
                })
                .catch(error => {
                    console.log(error?.message)
                    Swal.fire({
                        title: 'Error!',
                        text: `${error?.message}`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                })
            
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: `${error?.message}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }

    return (
        <div className="p-4">
            <div className={`divider ${isDarkMode ? 'divide-white' : 'divide-black'}`}></div>
            <div className="flex justify-center items-center my-4">
                <button className={`btn btn-circle btn-outline ${isDarkMode ? 'bg-white' : ''}`} onClick={handleGoogleLogin}>
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;