import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';


function VerifyReset() {
	const navigate = useNavigate();
	const [otpValue, setOtpValue] = useState(["0", "0", "0", "0"]);
	const otpLength = otpValue.Length
	let email = localStorage.getItem("email");

	const keyPressHandler = (e) => {
		let currentElementId = parseInt(e.target.id.slice(4));
		if (currentElementId === 1) return;
		if (e.key === "Backspace") {
			document.getElementById(`OTP-${currentElementId}`).placeholder = "";
			document.getElementById(`OTP-${currentElementId - 1}`).placeholder = "";
			document.getElementById(`OTP-${currentElementId - 1}`).focus()
		}
	}

	const onChangeHandler = (e) => {
		let currentElementId = parseInt(e.target.id.slice(4));
		document.getElementById(`OTP-${currentElementId}`).placeholder = e.target.value;
		let otpStoreValue = otpValue;
		otpStoreValue[currentElementId - 1] = e.target.value;
		setOtpValue(otpStoreValue);
		if (currentElementId === otpLength) return
		document.getElementById(`OTP-${currentElementId + 1}`).focus();
	}

	const reSendOtp = async () => {
		try {
				const response = await axios.post(`${baseurl}/api/user/reset-password-email/`, { email: email });
				console.log(response)

		} catch (error) {
			 
				console.log("Something Went wrong.",error);
		}
}

	const handelVerificationCode = async (e) => {
		e.preventDefault();
		let fullOtp = `${otpValue[0]}${otpValue[1]}${otpValue[2]}${otpValue[3]}`

		try {
			const payload = {
				email: email,
				otp: fullOtp
			}
			if (fullOtp != "0000") {
                const response = await axios.post(`${baseurl}/api/user/verify-admin/`, payload);
                console.log("Response",response);
                navigate('../resetpassword')
            }
		} catch (error) {
			console.log(error);
		}
		console.log("Otp value", fullOtp);
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
						<h1>Verification Code</h1>
						<p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8  xl:whitespace-nowrap break-all">We have just sent a verification code to <b className='text-yankeesBlue font-extrabold'>{email}</b></p>
						<div className="w-full pt-7 sm:pt-9">
							<form className="space-y-5">
								<div>
									<label htmlFor="" className="input-titel">Enter Code</label>
									<div className="flex space-x-4">
										<input type="text" id='OTP-1' onChange={onChangeHandler} onKeyDown={keyPressHandler} placeholder={otpValue[0]} maxLength="1" value="" className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:font-bold placeholder:text-2xl py-[17px]" required />
										<input type="text" id='OTP-2' onChange={onChangeHandler} onKeyDown={keyPressHandler} placeholder={otpValue[1]} maxLength="1" value="" className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:font-bold placeholder:text-2xl py-[17px]" required />
										<input type="text" id='OTP-3' onChange={onChangeHandler} onKeyDown={keyPressHandler} placeholder={otpValue[2]} maxLength="1" value="" className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:font-bold placeholder:text-2xl py-[17px]" required />
										<input type="text" id='OTP-4' onChange={onChangeHandler} onKeyDown={keyPressHandler} placeholder={otpValue[3]} maxLength="1" value="" className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:font-bold placeholder:text-2xl caret-transparent py-[17px]" required />
									</div>
								</div>
								<button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={handelVerificationCode}>Verified code</button>
								<span className="block text-sm text-[#94A3B8] font-bold text-center">I didn’t receive code?<Link to="" className='text-yankeesBlue font-bold ml-1' onClick={reSendOtp}> Resend</Link></span>
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

export default VerifyReset