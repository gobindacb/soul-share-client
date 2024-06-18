import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import toast from "react-hot-toast";
import { useState } from "react";



const SocialLogin = () => {

    const { googleLogin, githubLogin, twitterLogin } = UseAuth();

    // navigation after socialLogin
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';
    

    const handleSocialLogin = socialProvider => {
        socialProvider()
        .then(result =>{
            if (result.user){
                toast.success('Sign in successfully!') 
                navigate(from, {replace: true});                
            }
            
        })
        .catch(error => {
            toast.error('Login Failed: ' + error.message); // Display error message
        });
    };

    return (
        <>
            <div className='divider'>Continue with</div>
            <div className='flex gap-2 justify-center items-center mb-4'>
                <button onClick={() =>handleSocialLogin(googleLogin)} className='btn btn-outline'>Google</button>
                <button onClick={() =>handleSocialLogin(twitterLogin)} className='btn btn-outline'>Twitter</button>
                <button onClick={() =>handleSocialLogin(githubLogin)} className='btn btn-outline'>Github</button>
            </div>
        </>
    );
};

export default SocialLogin;