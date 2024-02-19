import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='container' style={{ height: '100vh' }}>
            <div>
                <Link to='/SignIn'>Sign In</Link>
            </div>
            <div>
                <Link to='/SignUp'>Sign Up</Link>
            </div>
            <div>
                <Link to='/ForgotPassword'>Forgot Password</Link></div>
            <div>
                <Link to='/Userprofile'>User Profile</Link>
            </div>
            <div>
                <Link to='/DoctorProfile'>DoctorProfile</Link>
            </div>
            <div>
                <Link to='/changepassword'>Change Password</Link>
            </div>
            <div className='m-3'>
                <Link to='/Hero'>Hero</Link>
            </div>
            <div>

            </div>
            <div>
                <Link to='/Listdoctor'>listdoctor</Link>
            </div>
        </div>

    )

}
