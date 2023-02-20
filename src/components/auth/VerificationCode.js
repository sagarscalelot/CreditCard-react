import React, { useState, useParams } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';

function VerificationCode() {
    // const params = useParams();
    const useremail = localStorage.getItem("email");
    // const flag = params.flag;
    const navigate = useNavigate();
    const [otpValue, setOtpValue] = useState(["0", "0", "0", "0"]);
    const otpLength = otpValue.length;



    function keyPressHandler(e) {

        let currentElementId = parseInt(e.target.id.slice(4));
        if (currentElementId == 1) return;
        if (e.key === 'Backspace') {
            document.getElementById(`digit-${currentElementId}`).placeholder = "";
            document.getElementById(`digit-${currentElementId - 1}`).placeholder = "";
            document.getElementById(`digit-${currentElementId - 1}`).focus();
        }

    }

    function onOtpInputHandler(e) {
        let currentElementId = parseInt(e.target.id.slice(4));
        document.getElementById(`digit-${currentElementId}`).placeholder = e.target.value;
        let temp = otpValue;
        temp[currentElementId - 1] = e.target.value;
        setOtpValue(temp);
        if (currentElementId == otpLength) return;
        document.getElementById(`digit-${currentElementId + 1}`).focus();
    }

    const reSendOtp = async () => {
        try {
            const response = await axios.post(`${baseurl}/api/user/resend-otp/`, { email: useremail });
            console.log(response)

        } catch (error) {
           
            console.log("Something Went wrong.",error);
        }
    }

    const verifiyCode = async (e) => {
        e.preventDefault();
        let fullOtp = otpValue[0] + otpValue[1] + otpValue[2] + otpValue[3];
        console.log(fullOtp);

        const reqobj = {
            email: useremail,
            otp: fullOtp
        }
        console.log(reqobj);
        try {
            if (fullOtp != "0000") {
                const response = await axios.post(`${baseurl}/api/user/verify-admin/`, reqobj);
                console.log("Response",response);
            }
        } catch (error) {
            console.log("Something Went wrong.");
            console.log(error);
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
                        <h1>Verification Code</h1>
                        <p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8 whitespace-nowrap">We have just sent a verification code to  {useremail != "" && <b className='text-yankeesBlue font-extrabold'>{useremail}</b>}</p>
                        <div className="w-full pt-7 sm:pt-9">
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="" className="input-titel">Enter Code</label>
                                    <div className="flex space-x-4">
                                        <input
                                            id="digit-1"
                                            onChange={onOtpInputHandler}
                                            onKeyDown={keyPressHandler}
                                            type="text"
                                            value=""
                                            placeholder={otpValue[0]}
                                            className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:text-base py-[17px]"
                                            maxLength={1}
                                        />
                                        <input
                                            id="digit-2"
                                            onChange={onOtpInputHandler}
                                            onKeyDown={keyPressHandler}
                                            type="text"
                                            value=""
                                            placeholder={otpValue[1]}
                                            className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:text-base py-[17px]"
                                            maxLength={1}
                                        />
                                        <input
                                            id="digit-3"
                                            onChange={onOtpInputHandler}
                                            onKeyDown={keyPressHandler}
                                            type="text"
                                            value=""
                                            placeholder={otpValue[2]}
                                            className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:text-base py-[17px]"
                                            maxLength={1}
                                        />
                                        <input
                                            id="digit-4"
                                            onChange={onOtpInputHandler}
                                            onKeyDown={keyPressHandler}
                                            type="text"
                                            value=""
                                            placeholder={otpValue[3]}
                                            className="input_box placeholder:text-[#94A3B8] text-center placeholder:text-center placeholder:text-base py-[17px]"
                                            maxLength={1}
                                        />
                                    </div>
                                </div>
                                <button onClick={verifiyCode} className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" >Verified code</button>
                                <span className="block text-sm text-[#94A3B8] font-bold text-center">I didn’t receive code?<Link to="" className='text-yankeesBlue font-bold ml-1'> Resend</Link></span>
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

export default VerificationCode