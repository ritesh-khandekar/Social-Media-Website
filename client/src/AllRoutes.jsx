import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import ProfileBioForm from './pages/user/ProfileBioForm'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/bioupdate' element={<ProfileBioForm />} />
        </Routes>
    )
}

export default AllRoutes
