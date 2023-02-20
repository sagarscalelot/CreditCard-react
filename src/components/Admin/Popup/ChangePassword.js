import React, { useEffect, useState } from 'react';
import { baseurl } from '../../../api/baseurl';
import axios from 'axios';

function ChangePassword({ handleClose }) {

    const [userData, setUserData] = useState({ old_password: "", password: "",password2:"" });
	const [error, setError] = useState(false);
    const token = localStorage.getItem("Token");

    const setFormField = (field, value) => {
		setUserData({ ...userData, [field]: value })
	}
    const header = {
        'Authorization': `Bearer ${token}`,
    }

    const handleSubmit = async (data) => {
		data.preventDefault();
        if (data.password !== data.password2) {
			alert("password not match")
			return
		}
		try {
			const response = await axios.post(`${baseurl}/api/user/change-password/`, { old_password: userData.old_password, password: userData.password,password2: userData.password2 }, { headers: header });
            handleClose(false)
		} catch (error) {
            console.log('Something went wrong!!!');
			setError(true);
		}
	}

    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50'>
            <div className="max-w-[508px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-8">
                <div className="">
                    <h3 className="text-center text-[#111827]">Change password</h3>
                    <div className="pt-6">
                        <form className='space-y-4'>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Current Password</label>
                                <input type="text" name="old_password" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter current password' value={userData.old_password} onChange={(e) => { setFormField('old_password', e.target.value); setError(false) }} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">New Password</label>
                                <input type="text" name="password" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter new password'  value={userData.password} onChange={(e) => { setFormField('password', e.target.value); setError(false) }}  />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Confirm Password</label>
                                <input type="text" name="password2" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter confirm password'  value={userData.password2} onChange={(e) => { setFormField('password2', e.target.value); setError(false) }} />
                            </div>
                            <div className="flex space-x-5">
                                <button type="button" className="btn-gray w-full" onClick={() => handleClose(false)}>Cancel</button>
                                <button type="submit" className="btn-primary w-full"  onClick={handleSubmit}>Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword