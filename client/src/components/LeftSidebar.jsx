import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faHome, faUserCheck, faUserClock, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import './leftsidebar.css'

const LeftSidebar = () => {
    if(['login','signup','logout'].filter(path=> window.location.pathname.includes(path)).length > 0){
        return <></>
    }
    return <>
        <div className="sidebar">
            <NavLink to={'/'}><FontAwesomeIcon className='sidebar-icons active' icon={faHome} /> Home</NavLink>
            <p>Friends <FontAwesomeIcon icon={ faAngleDown}/></p>
            <NavLink to={'/sentrequests'}><FontAwesomeIcon className='sidebar-icons' icon={faUserCheck} /> Sent requests</NavLink>
            <NavLink to={'/friendrequests'}><FontAwesomeIcon className='sidebar-icons' icon={faUserClock} /> Friend requests</NavLink>
            <NavLink to={'/allfriends'}><FontAwesomeIcon className='sidebar-icons' icon={faUserGroup} /> All friends</NavLink>
            <NavLink to={'/friendsuggestions'}><FontAwesomeIcon className='sidebar-icons' icon={faUserPlus} /> Suggestions</NavLink>
        </div>
    </>
}

export default LeftSidebar