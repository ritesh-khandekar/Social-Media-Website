import { faCaretDown, faEdit, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandName } from '../components/Brand'
import Avatar from '../pages/user/Avatar'
import { useDispatch } from 'react-redux'
import './navbar.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const [sidebarOpen, setsidebarOpen] = useState(false)
    // useEffect(() => {
    //     dispatch({ type: 'SIDEBAR'})
    // }, [sidebarOpen])
    return <>
        <div className={"topnav"}>
            <Link style={{ fontSize: "15px" }} className="icon" onClick={() => dispatch({ type: "SIDEBAR"})}>&#9776;</Link>
            <Link to={"/"} className='brand' >{BrandName}</Link>
            <div className="dropdown">
                <button className="dropbtn noactive"><Avatar />
                </button>
                <div className="dropdown-content">
                    <Link to={"/"}><FontAwesomeIcon icon={faUser} /> View profile</Link>
                    <Link to={"/"}><FontAwesomeIcon icon={faEdit} /> Change details</Link>
                    <Link to={"/logout"} className='logout-link'> <FontAwesomeIcon icon={faSignOut} /> Logout </Link>
                </div>
            </div>
        </div>
    </>
}

export default Navbar