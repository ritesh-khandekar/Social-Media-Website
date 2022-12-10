import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faHome, faUserCheck, faUserClock, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import './leftsidebar.css'

const LeftSidebar = () => {
    if(['login','signup','logout'].filter(path=> window.location.pathname.includes(path)).length > 0){
        return <></>
    }
    return <>
        <div className="sidebar">
            <Link to={'/'} className='active'><FontAwesomeIcon className='sidebar-icons active' icon={faHome} /> Home</Link>
            <p>Friends <FontAwesomeIcon icon={ faAngleDown}/></p>
            <Link to={'/'}><FontAwesomeIcon className='sidebar-icons' icon={faUserCheck} /> Sent requests</Link>
            <Link to={'/'}><FontAwesomeIcon className='sidebar-icons' icon={faUserClock} /> Friend requests</Link>
            <Link to={'/'}><FontAwesomeIcon className='sidebar-icons' icon={faUserGroup} /> All friends</Link>
            <Link to={'/'}><FontAwesomeIcon className='sidebar-icons' icon={faUserPlus} /> Suggestions</Link>
        </div>
    </>
}

export default LeftSidebar