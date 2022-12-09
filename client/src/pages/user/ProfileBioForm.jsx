import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ImageCrop from '../../components/ImageCrop'
import Loader from '../../components/Loader'
import defaultPic from '../../assets/profile/user.png'
import './profileform.css'
import { updateProfile } from '../../actions/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const ProfileBioForm = ({ setVisibleComponent, oldBio }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [VisibleCropper, setVisibleCropper] = useState(false)
    const [bio, setBio] = useState(null)
    const [profile, setprofile] = useState(null) //Display cropped pic
    const [imgData, setimgData] = useState('') //Set Image data for cropper

    const onChangePic = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setimgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            setVisibleCropper(true)
        }
    }
    useEffect(() => {
        try {
          setprofile(JSON.parse(localStorage.getItem("Profile")).result.profile)
        } catch (e) {
          navigate("/login")
        }
      }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bio && !profile) {
            return alert("Please enter the required data")
        }
        setIsLoading(true)
        dispatch(updateProfile({ profile, bio }, navigate, setIsLoading, setVisibleComponent))
    }
    return <>
        <div className="form-parent">
            <div className="profile-bio-update-form">
                <div onClick={(e) => setVisibleComponent(false)} className="close-btn"><FontAwesomeIcon icon={faClose} /></div>
                {
                    isLoading ?
                        <Loader /> : <></>
                }
                {
                    VisibleCropper ?
                        <ImageCrop image={imgData} setCropData={setprofile} setVisibleCropper={setVisibleCropper} /> : <></>
                }
                <form action="" onSubmit={handleSubmit}>
                    <div className="profile-img-selector">
                        <img src={!profile ? defaultPic : profile} alt="Uploaded profile" className='preview-img' />
                        <div className="text-muted">Please choose a Profile image from your device <FontAwesomeIcon icon={faInfoCircle} title="Please select image less than 300kb for better performance"/></div>
                        <input accept='image/*' type="file" name="" id="" onChange={onChangePic} />
                    </div>
                    <div className="bio-update">
                        <div className="text-muted">Please enter bio: </div>
                        <textarea placeholder='Write something in bio...' className='text-bio' onChange={(e => setBio(e.target.value))} name="bio" id="bio" rows={4} value={oldBio}></textarea>
                    </div>
                    <div className="center">
                        <button type='submit' className='update-profile-bio-btn'>Upload profile and bio</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default ProfileBioForm