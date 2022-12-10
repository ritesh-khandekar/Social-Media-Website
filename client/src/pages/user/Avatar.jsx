import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './avatar.css'
const Avatar = () => {
    const navigate = useNavigate()
    const [letter, setLetter] = useState('')
    
    useEffect(() => {
        try {
             setLetter(JSON.parse(localStorage.getItem("Profile")).result.fname.toString().charAt(0))
        } catch (err) {
            // navigate("/login")
        }
    },[])
    return <>
        <div className="avatar">{letter}</div>
    </>
}

export default Avatar