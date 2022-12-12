import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faEdit, faEnvelope, faImage, faPhone, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import profileImg from '../../assets/profile/user.png'
import ProfileBioForm from './ProfileBioForm'
import EditProfileDetails from './EditProfileDetails'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../actions/user'
import Loader from '../../components/Loader'
import './profile.css'

const Profile = ({ rightsidebar=false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { id: friendID } = useParams()
  const [updateProfileForm, setUpdateProfileForm] = useState(false)
  const [editDetailsForm, seteditDetailsForm] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [validUser, setValidUser] = useState(true)
  let id;
  try {
    
    id = JSON.parse(localStorage.getItem("Profile")).result._id
  } catch (error) {
    id=''
  }
  useEffect(() => {
    if (friendID) {
      setValidUser(friendID == id)
      id = friendID
    }
  }, [])
  useEffect(() => {
    try {
      setisLoading(true)
      dispatch(getProfile(setProfileData, setisLoading, navigate, id))
    } catch (e) {
      navigate("/login")
    }
  }, [updateProfileForm, editDetailsForm,])

  const handleLogout = () => {
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }
  const handleProfileClick = () => {
    if (typeof friendID == 'undefined') {
      navigate("/posts/")
      return
    }
    navigate("/posts/" + friendID)
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
    <div className={"profile-container"+(rightsidebar ? " right-sidebar":"")}>
      <img src={!profileData ? profileImg : (typeof profileData["profile"] !== "undefined" ? (profileData["profile"] ? profileData.profile : profileImg) : profileImg)} alt="" className="profile-img" />
      <h2 className='username'>{profileData.fname} {profileData.lname}</h2>
      <p className='profile-bio'>{profileData.bio}</p>
      {
        validUser ?
          <button onClick={(e) => setUpdateProfileForm(true)} type='button' className='update-profile-bio-btn'><FontAwesomeIcon icon={faEdit} /> Edit profile</button>
          : <></>
      }
      <hr />
      <h3>Profile Details</h3>
      <div className="profile-details">
        <p className="profile-detail"><FontAwesomeIcon icon={faUser} /> {profileData.fname + " " + profileData.lname}</p>
        <p className="profile-detail"><FontAwesomeIcon icon={faPhone} /> {profileData.phone}</p>
        <p className="profile-detail"><FontAwesomeIcon icon={faEnvelope} /> {profileData.email}</p>
        <p className="profile-detail"><FontAwesomeIcon icon={faUser} /> {profileData.gender}</p>
        <p className="profile-detail"><FontAwesomeIcon icon={faCalendar} /> Joined On: {new Date(profileData.time).toDateString()}</p>
      </div>
      {validUser ?
        <button onClick={(e) => seteditDetailsForm(true)} type='button' className='btn-update-details update-profile-bio-btn'><FontAwesomeIcon icon={faEdit} /> Edit Details</button>
        : <></>
      }
      <hr />
      <h4 style={{ margin: "10px" }} className={profileData.posts ? "post-count":""} onClick={handleProfileClick}>Posts ({profileData.posts})</h4>
      {/* <button onClick={handleProfileClick} className="update-profile-bio-btn" style={{ maxWidth: '50%' }}><FontAwesomeIcon icon={faImage} /> View posts ({profileData.posts})</button> */}
      <hr />
      <h4>Born on {new Date(profileData.birthdate).toDateString()}</h4>
      <div className="center">
        {/* {validUser ?
          <button type="button" className="logout-btn" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /> Logout</button>
          : <></>
        } */}
      </div>
    </div>
  </>
}

export default Profile