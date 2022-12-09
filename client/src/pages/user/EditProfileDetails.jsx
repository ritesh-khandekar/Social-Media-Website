import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import './editprofile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faSave, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { updateProfile } from '../../actions/user'

const EditProfileDetails = ({ setVisibleComponent }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profile = (JSON.parse(localStorage.getItem("Profile")).result)
    const [isLoading, setIsLoading] = useState(false)
    const [fname, setfname] = useState(profile.fname)
    const [lname, setlname] = useState(profile.lname)
    const [phone, setphone] = useState(profile.phone)
    const [birthdate, setbirthdate] = useState(profile.birthdate)
    const [gender, setgender] = useState(profile.gender)
    const [email, setEmail] = useState(profile.email)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !fname || !lname || !gender || !phone || !birthdate) return alert("Please enter all the details")
        setIsLoading(true)
        dispatch(updateProfile({ email, fname, lname, gender, phone, birthdate }, navigate, setIsLoading, setVisibleComponent))
    }

    return <>
        {
            isLoading ?
                <Loader /> : <></>
        }
        <div className="form-parent">
            <div className="edit-profile-form">
                <form action="" onSubmit={handleSubmit}>
                    <div onClick={(e) => setVisibleComponent(false)} className="close-btn"><FontAwesomeIcon icon={faClose} /></div>
                    <h1 className='edit-profile-header'>Edit Profile</h1>
                    <hr />
                    <div className="input-row">
                        <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} placeholder='First name' />
                        <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} placeholder='Surname' />
                    </div>
                    <input type="tel" name="phone" value={phone} onChange={(e) => setphone(e.target.value)} placeholder='Mobile number' id="phone" />
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' id="email" />

                    <p className='text-muted'>Date of birth</p>
                    <input type="date" value={birthdate} onChange={(e) => setbirthdate(e.target.value)} min={"1950-01-01"} max={"2015-01-01"} name="" id="" />

                    <p className='text-muted'>Gender</p>
                    <div className='gender-selector'>
                        <input type="radio" onChange={(e) => setgender(e.target.checked ? "male" : "female")} name="gender" id="maleGender" checked={profile.gender == 'male'} />
                        <label htmlFor="maleGender">Male</label>
                        <input type="radio" onChange={(e) => setgender(e.target.checked ? "female" : "male")} name="gender" id="femaleGender" checked={profile.gender == 'female'} />
                        <label htmlFor="femaleGender">Female</label>
                    </div>
                    <div className="center">
                        <button type="submit" className="edit-profile-btn" ><FontAwesomeIcon icon={faSave} /> Save changes</button>
                    </div>
                </form>
            </div>
        </div>

    </>
}

export default EditProfileDetails