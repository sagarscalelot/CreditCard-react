import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/auth/ForgotPassword';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import VerificationCode from '../components/auth/VerificationCode';
import ResetPassword from '../components/auth/ResetPassword';
import SideBar from '../components/SideBar/SideBar';
import VerifyReset from '../components/auth/VerifyReset';

function AllRoutes() {
    return (
        <Routes className="main min-h-screen h-ful w-full">
            <Route path='/' >
                {/* <Route path='auth'> */}
                    <Route index  element={<Login />} /> {/*  path='login' */}
                    <Route path='register' element={<Register />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                    <Route path='verificationcode' element={<VerificationCode />} />
                    <Route path='verifyreset' element={<VerifyReset />} />
                    <Route path='resetpassword' element={<ResetPassword />} />
                {/* </Route> */}
                <Route path="/*" element={<SideBar />} />
                <Route path="*"
                    element={<h1 style={{ color: "red", margin: "50px" }}>
                        404 | PAGE NOT FOUND
                    </h1>
                    }
                />
            </Route>
        </Routes>
    )
}

export default AllRoutes