import 'firebase/auth';
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../Login/SocialLogin';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';


const Register = () => {



    // navigation after register
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/'

    // for password toggle
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        }
        else {
            setIcon(eyeOff);
            setType('password')
        }
    }

    // validate password
    const [isValid, setIsValid] = useState(true);
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
        setIsValid(regex.test(password));
    };

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password, fullName, imageUrl } = data;
        // create user and update profile
        createUser(email, password)
            .then(() => {
                updateUserProfile(fullName, imageUrl)
                    .then(() => {
                        const user = { email }
                        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, { withCredentials: true })
                        navigate(from, { replace: true });
                        toast.success('User created & log in successfully'); // Show success toast                  
                    });
            })
            .catch(error => {
                toast.error('Failed to create user: ' + error.message); // Show error toast
            });
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>
                    Soul-Share | Register
                </title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-center ">
                        <h2 className="text-3xl mb-6">Register</h2>
                        <h1 className="text-3xl lg:text-7xl">Soul Share</h1>
                        <p>Volunteerism that Touches the Soul</p>
                    </div>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Full Name" className="input input-bordered"
                                {...register("fullName", { required: true })} />
                            {errors.fullName && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image Url</span>
                            </label>
                            <input type="text" placeholder="Image Url" className="input input-bordered"
                                {...register("imageUrl", { required: true })}
                            />
                            {errors.imageUrl && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-6">
                                <input type={type} placeholder="password" className="grow"
                                    {...register("password", { required: true })}
                                    onChange={(e) => {
                                        validatePassword(e.target.value);
                                    }}
                                />
                                <span onClick={handleToggle}><Icon icon={icon} size={20} /></span>
                            </label>
                            {!isValid && <p>Password should be 6 digits, contain one capital letter, one number, and one special character.</p>}
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="text-center">Have an account? <Link className="text-green-500 underline" to='/login'>Login Now</Link></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;