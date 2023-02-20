import React,{useState,useEffect} from 'react';
import Modal from '../../common/Modals/Modal';
import ChangePassword from './Popup/ChangePassword';
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function AdminAccountDetails() {
    const [changePassword, setChangePassword] = useState(false);
    const token = localStorage.getItem("Token");
    const [details, setDetails] = useState({});
   
    const navigate = useNavigate();
    const header = {
        'Authorization': `Bearer ${token}`,
    }

    const getCardDetails = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/user/user-profile/`, { headers: header });
            console.log("RESPONSE>>>", response.data.data);
            setDetails(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCardDetails();
    }, []);
    return (
        <div className="wrapper min-h-full">
            <div className="flex items-center">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                </svg>
               <Link to={"/dashboard"}><button type='button' className="text-3xl font-bold text-yankeesBlue leading-8 pl-7">{details?.first_name} {details?.last_name}'s Account Details</button></Link> 
            </div>
            <div className="pt-[50px]">
                <form className="w-full flex items-center justify-between">
                    <div className="w-full">
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">First name</label>
                                <input type="text" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.first_name} placeholder='' disabled />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Last name</label>
                                <input type="text" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.last_name} placeholder='' disabled />
                            </div>
                        </div>
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Email</label>
                                <input type="email" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.email} placeholder='' disabled />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Phone number</label>
                                <input type="tel" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.phone_no} placeholder='' disabled />
                            </div>
                        </div>
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Password</label>
                                <div className="relative">
                                    <input type="password" name="" className="relative input_box2 placeholder:text-[#94A3B8] placeholder:text-base" placeholder='**** **** ****' disabled />
                                    <span onClick={() => setChangePassword(true)} className='absolute right-6 top-1/2 -translate-y-1/2 text-[#29A073] text-base font-extrabold cursor-pointer'>Change password</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Modal isOpen={changePassword}>
                <ChangePassword handleClose={setChangePassword}/>
            </Modal>
        </div>

    )
}

export default AdminAccountDetails