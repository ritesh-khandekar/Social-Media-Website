import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import '../pages/auth/auth.css'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch({ type: 'LOGOUT' })
    navigate("/login")
    return (
        <div className='logout-message'>Logged out sucessfully. <Link to={'/login'}  className='forget-password'>Go to login page</Link></div>
    )
}

export default Logout