import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './avatar.css'
const Avatar = () => {
    const navigate = useNavigate()
    const [letter, setLetter] = useState('')
    const [profile, setProfile] = useState('')

    useEffect(() => {
        try {
             setLetter(JSON.parse(localStorage.getItem("Profile")).result.fname.toString().charAt(0))
             setProfile(JSON.parse(localStorage.getItem("Profile")).result.profile)
        } catch (err) {
            navigate("/login")
        }
    },[])
    return <>
        <div className="avatar">{profile=='' ?letter: <img src={profile} className='nav-profile-img' width={"30px"} alt='Profile'/>}</div>
    </>
}

export default Avatar