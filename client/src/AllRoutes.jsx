import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Logout from './components/Logout'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import EditProfileDetails from './pages/user/EditProfileDetails'
import Profile from './pages/user/Profile'
import ProfileBioForm from './pages/user/ProfileBioForm'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/bioupdate' element={<ProfileBioForm />} />
            <Route path='/profileedit' element={<EditProfileDetails />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default AllRoutes
