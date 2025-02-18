import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/socialLogin/SocialLogin';
import useTitle from '../../hooks/useTitle';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {login, loading} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';
    useTitle("Log In");
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      const onSubmit = (data) =>{
        console.log(data)
        login(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully! You have logged in your account.',
                showConfirmButton: false,
                timer: 1500
              });
            if(!loading){

                navigate(from, {replace: true})
            }  
        })
        .catch(error => {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: `${error?.message}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
      } 
    return (
        <>
            <div className="hero min-h-screen" data-aos="fade-down">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src='/loginImage.JPG' alt="" />
                    </div>
                    <div className={`card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-black`}>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Please Login!</h1>
                        <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Email</span>
                        </label>
                        <input type="text" placeholder="email" className={`input input-bordered
                        `}
                        {...register("email", { required: true })} required/>
                         {errors.name && <span>Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text`}>Password*</span>
                            </label>
                            <div className="relative">
                                <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={`input input-bordered w-full`} 
                                {...register("password", { required: true, minLength: 6, 
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])/i })} required/>
                                <span
                                className={`absolute inset-y-0 right-0 px-3 py-2 btn bg-transparent border-0`}
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            
                            {errors.password && <span className="text-red-500">
                                <small>Password field is required. Password must have 6 characters,
                            one capital letter, one special letter</small></span>}
                        </div>
                        <div className="form-control mt-6">
                        <input type="submit" value="Login" className="btn bg-[#2ccf31] text-white"/>
                        </div>
                        <p><small>New to Flavors? Please 
                            <Link className='text-[#27aa2c]' to="/signup"> Sign Up</Link></small></p>
                    </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;