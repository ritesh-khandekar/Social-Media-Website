import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ImageCrop from '../../components/ImageCrop'
import Loader from '../../components/Loader'
import defaultPic from '../../assets/profile/user.png'
import './profile.css'
import { updateProfile } from '../../actions/user'

const ProfileBioForm = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bio && !profile) {
            alert("Please enter the required data")
        }
        setIsLoading(true)
        dispatch(updateProfile({ profile, bio }, navigate, setIsLoading))
    }
    return <>
        <div className="profile-bio-update-form">
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
                    <img src={!profile ? defaultPic : profile} alt="Uploaded profile image" className='preview-img' />
                    <div className="text-muted">Please choose an Profile image from your device: </div>
                    <input accept='image/*' type="file" name="" id="" onChange={onChangePic} />
                </div>
                <div className="bio-update">
                    <div className="text-muted">Please enter bio: </div>
                    <textarea placeholder='Write something in bio...' className='text-bio' onChange={(e => setBio(e.target.value))} name="bio" id="bio" rows={4}></textarea>
                </div>
                <div className="center">
                    <button type='submit' className='update-profile-bio-btn'>Upload profile and update bio</button>
                </div>
            </form>
        </div>
    </>
}

export default ProfileBioForm