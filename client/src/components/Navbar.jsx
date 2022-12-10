import { faBars, faCaretDown, faClose, faEdit, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandName } from '../components/Brand'
import Avatar from '../pages/user/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const sidebarOpen = useSelector((state) => state.sidebarReducer)

    if (['login', 'signup', 'logout'].filter(path => window.location.pathname.includes(path)).length > 0) {
        return <></>
    }
    return <>
        <div className={"topnav"}>
            <Link style={{ fontSize: "15px" }} className="icon" onClick={() => dispatch({ type: "SIDEBAR" })}><FontAwesomeIcon icon={sidebarOpen ? faClose : faBars} /></Link>
            <Link to={"/"} className='brand' >{BrandName}</Link>
            <div className="dropdown">
                <button className="dropbtn noactive"><Avatar />
                </button>
                <div className="dropdown-content">
                    {
                        window.innerWidth > 700 ? <></> :
                            <>
                                <Link to={"/profile"}><FontAwesomeIcon icon={faUser} /> View profile</Link>
                                <Link to={"/profile"}><FontAwesomeIcon icon={faEdit} /> Change details</Link>
                            </>
                    }
                    <Link to={"/logout"} className='logout-link'> <FontAwesomeIcon icon={faSignOut} /> Logout </Link>
                </div>
            </div>
        </div>
    </>
}

export default Navbar