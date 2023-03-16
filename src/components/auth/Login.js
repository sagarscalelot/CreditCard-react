import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
	const [userData, setUserData] = useState({ email: "", password: "" });
	const [error, setError] = useState(false);

	const setFormField = (field, value) => {
		setUserData({ ...userData, [field]: value })
	}

    const handleSubmit = async (data) => {
		data.preventDefault();
		try {
			const response = await axios.post(`${baseurl}/api/user/login-admin`, { email: userData.email, password: userData.password });
			
            if(response.data?.Status){
                localStorage.clear();
                localStorage.setItem("Token", response.data?.Data.token);
                navigate("../dashboard")
            }
		} catch (error) {
            console.log('Something went wrong!!!');
			setError(true);
		}
	}
    return (
        <div className="flex h-screen">
            <div className="flex w-full flex-wrap bg-white">
                <div className="w-full relative lg:w-1/2 flex p-[60px]">
                    <div className="">
                        <div className="absolute top-0 sm:right-20 md:right-32 sm:block hidden">
                            <img src={topCircle} alt="Top Circle Shape" />
                        </div>
                        <div className="absolute bottom-0 sm:left-20 md:left-32 sm:block hidden">
                            <img src={bottomCircle} alt="Bottom Circle Shape" />
                        </div>
                    </div>
                    <Link to='' className='absolute'><img src={logo} alt="Alt Text" /></Link>
                    <div className="max-w-md w-full m-auto">
                        <h1>Welcome back</h1>
                        <p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8">Welcome back! Please enter your details</p>
                        <small className='text-[#FB7181] text-xs font-semibold leading-4'>Invalid Mobile or Password Please Try Again!</small>
                        <div className="w-full pt-7 sm:pt-9">
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="" className="input-titel">Email or Phone</label>
                                    <input type="text" name="username" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter your email' value={userData.email} onChange={(e) => { setFormField('email', e.target.value); setError(false) }} required />
                                </div>
                                <div>
                                    <label htmlFor="" className="input-titel">Password</label>
                                    <input type="Password" name="Password" placeholder='Enter your password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base"  value={userData.password} onChange={(e) => { setFormField('password', e.target.value); setError(false) }} required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <label className="checkbox w-5 mr-2"><input type="checkbox" className="bg-white" /><i className="icon-right"></i></label>
                                        <span className="text-sm leading-5 text-yankeesBlue font-bold">Remember for 30 Days</span>
                                    </div>
                                    <Link to="../forgotpassword" className="text-yankeesBlue font-bold text-xs md:text-sm block text-right">Forgot password</Link>
                                </div>
                                <Link to="../../dashboard" className='block'>
                                    <button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={handleSubmit}>Sign in</button>
                                </Link>
                                <span className="block text-sm text-[#94A3B8] font-bold text-center">Don’t have an account?<Link to="../register" className='text-yankeesBlue font-bold ml-1'>Sign up for free</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2 hidden lg:block">
                    <img src={bgImage} alt="login-bg" className="w-full h-full object-cover object-bottom" />
                </div>
            </div>
        </div>
    )
}

export default Login