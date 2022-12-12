import { faBars, faCaretDown, faClose, faEdit, faGear, faGears, faPlus, faPlusCircle, faPlusSquare, faSignOut, faUser, faUserClock, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import decode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../pages/user/Avatar'
import { setCurrentUser } from '../actions/currentUser'
import { useDispatch, useSelector } from 'react-redux'
import LeftSidebar from './LeftSidebar'
// import './navbar.css'

import logo from '../assets/brand/logo.png'
import './navbar_new.css'


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sidebarOpen = useSelector((state) => state.sidebarReducer)
    var User = useSelector((state) => (state.currentUserReducer))

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentUser(null))
        window.location.href = '/'
    }
    useEffect(() => {
        const token = User?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [User?.token, dispatch])
    if (['login', 'signup', 'logout', 'test'].filter(path => window.location.pathname.includes(path)).length > 0) {
        return <></>
    }
    return <>
        {/* <div className={"topnav"}>
            <Link style={{ fontSize: "15px" }} className="icon" onClick={() => dispatch({ type: "SIDEBAR" })}><FontAwesomeIcon icon={sidebarOpen ? faClose : faBars} /></Link>
            <Link to={"/"} className='brand' >{BrandName}</Link>
            <Link to={"/createpost"} className="add-post"><FontAwesomeIcon icon={ faPlus }/></Link>
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
                    <a className='logout-link' onClick={handleLogout}> <FontAwesomeIcon icon={faSignOut} /> Logout </a>
                </div>
            </div>
        </div> */}
        <div className="navbar-new">
            <div className="left-links">
            <div className="sidebar-dropdown">
                <FontAwesomeIcon icon={faBars} className="nav-link screen-sm sidebar-toggle-btn" />
                <LeftSidebar responsive={true} dropdown={true} />
            </div>
                <Link className='brand-name'><img src={logo} className='brand-image' alt="Brand" height={"42px"} /></Link>
            </div>
            <div className="center-links">
            </div>
            <div className="right-links">
                <Link to={"/friendrequests"} className="nav-link"><FontAwesomeIcon icon={faUserClock} /></Link>
                <Link to={"/profile"} className="nav-link screen-lg" ><FontAwesomeIcon icon={faGear} /></Link>
                <Link to={"/createpost"} className="nav-link"><FontAwesomeIcon icon={faPlus} /></Link>
                <div className="nav-dropdown">
                    <Link className="nav-link link-user-avatar"><Avatar /></Link>
                    <div className="nav-dropdown-content">
                        <Link to={"/profile"} className="nav-link screen-sm"><FontAwesomeIcon icon={faUser} /> View profile</Link>
                        <Link onClick={handleLogout} className="nav-link logout-link"><FontAwesomeIcon icon={faSignOut} /> Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Navbar