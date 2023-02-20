import React from 'react'

function ChangePassword({ handleClose }) {
    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50'>
            <div className="max-w-[508px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-8">
                <div className="">
                    <h3 className="text-center text-[#111827]">Change password</h3>
                    <div className="pt-6">
                        <form className='space-y-4'>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Current Password</label>
                                <input type="text" name="username" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter current password' required />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">New Password</label>
                                <input type="text" name="username" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter new password' required />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Confirm Password</label>
                                <input type="text" name="username" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter confirm password' required />
                            </div>
                            <div className="flex space-x-5">
                                <button type="button" className="btn-gray w-full" onClick={() => handleClose(false)}>Cancel</button>
                                <button type="button" className="btn-primary w-full">Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword