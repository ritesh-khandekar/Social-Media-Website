import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSignOut } from '@fortawesome/free-solid-svg-icons'
import profileImg from '../../assets/profile/user.png'
import ProfileBioForm from './ProfileBioForm'
import './profile.css'
import EditProfileDetails from './EditProfileDetails'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../actions/user'
import Loader from '../../components/Loader'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateProfileForm, setUpdateProfileForm] = useState(false)
  const [editDetailsForm, seteditDetailsForm] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [profileData, setProfileData] = useState({})
  useEffect(() => {
    try {
      setisLoading(true)
      dispatch(getProfile(setProfileData, setisLoading, navigate))
    } catch (e) {
      navigate("/login")
    }
  }, [updateProfileForm, editDetailsForm,])
  const handleLogout = () => {
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }
  if (['login', 'signup', 'logout'].filter(path => window.location.pathname.includes(path)).length > 0) {
    return <></>
  }
  return <>
    {
      isLoading ? <Loader /> : <></>
    }
    {
      updateProfileForm ? <ProfileBioForm setVisibleComponent={setUpdateProfileForm} oldBio={profileData.bio} /> : <></>
    }
    {
      editDetailsForm ? <EditProfileDetails setVisibleComponent={seteditDetailsForm} /> : <></>
    }
    <div className="profile-container">
      <img src={!profileData ? profileImg : (typeof profileData["profile"] !== "undefined" ? (profileData["profile"] ? profileData.profile : profileImg) : profileImg)} alt="" className="profile-img" />
      <h2 className='username'>{profileData.fname} {profileData.lname}</h2>
      <p className='profile-bio'>{profileData.bio}</p>
      <button onClick={(e) => setUpdateProfileForm(true)} type='button' className='update-profile-bio-btn'><FontAwesomeIcon icon={faEdit} /> Edit profile</button>
      <hr />
      <h3>Profile Details</h3>
      <div className="profile-details">
        <p className="profile-detail">Name: {profileData.fname + " " + profileData.lname}</p>
        <p className="profile-detail">{profileData.email}</p>
        <p className="profile-detail">Gender: {profileData.gender}</p>
        <p className="profile-detail">Phone: {profileData.phone}</p>
        <p className="profile-detail">Joined On: {new Date(profileData.time).toDateString()}</p>
      </div>
      <button onClick={(e) => seteditDetailsForm(true)} type='button' className='btn-update-details update-profile-bio-btn'><FontAwesomeIcon icon={faEdit} /> Edit Details</button>
      <hr />
      <h4>Posts ({profileData.posts})</h4>
      <hr />
      <h3>Born on {new Date(profileData.birthdate).toDateString()}</h3>
      <div className="center">
        <button type="button" className="logout-btn" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /> Logout</button>
      </div>
    </div>
  </>
}

export default Profile