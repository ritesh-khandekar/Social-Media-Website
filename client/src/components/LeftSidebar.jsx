import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faHome, faImage, faSignOut, faUserCheck, faUserClock, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons'

// import './leftsidebar.css'
import './leftsidebar_new.css'

const LeftSidebar = ({ dropdown=false }) => {
    if (['login', 'signup', 'logout'].filter(path => window.location.pathname.includes(path)).length > 0) {
        return <></>
    }
    return <>
        <div className={"sidebar" + (dropdown ? " sidebar-dropdown-content":"")}>
            <NavLink className={"sidebar-link link-divider"} to={'/'}><FontAwesomeIcon className='sidebar-icons' icon={faHome} /> Home</NavLink>
            <NavLink className={"sidebar-link"} to={'/sentrequests'}><FontAwesomeIcon className='sidebar-icons' icon={faUserCheck} /> Sent requests</NavLink>
            <NavLink className={"sidebar-link"} to={'/friendrequests'}><FontAwesomeIcon className='sidebar-icons' icon={faUserClock} /> Friend requests</NavLink>
            <NavLink className={"sidebar-link"} to={'/allfriends'}><FontAwesomeIcon className='sidebar-icons' icon={faUserGroup} /> All friends</NavLink>
            <NavLink className={"sidebar-link link-divider"} to={'/friendsuggestions'}><FontAwesomeIcon className='sidebar-icons' icon={faUserPlus} /> Suggestions</NavLink>
            <NavLink className={"sidebar-link link-divider"} to={'/posts'}><FontAwesomeIcon className='sidebar-icons' icon={faImage} /> All Posts</NavLink>
            <NavLink className={"sidebar-link"} to={'/profile'}><FontAwesomeIcon className='sidebar-icons' icon={faGears} /> Profile Settings</NavLink>
            <div className="sidebar-grow"></div>
            {/* <NavLink className={"sidebar-link link-logout"} to={'/profile'}><FontAwesomeIcon className='sidebar-icons' icon={faSignOut} /> Logout</NavLink> */}

        </div>
    </>
}

export default LeftSidebar