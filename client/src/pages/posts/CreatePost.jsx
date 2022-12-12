import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ImageCrop from '../../components/ImageCrop'
import Loader from '../../components/Loader'
import addpost from '../../assets/posts/addpost.png'
import '../user/profileform.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faClose, faDiagramNext, faInfoCircle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { BrandName } from '../../components/Brand'
import { newPost } from '../../actions/post'
import { redirect } from '../../actions/redirect'

const ProfileBioForm = ({  }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [VisibleCropper, setVisibleCropper] = useState(false)
    const [caption, setCaption] = useState('')
    const [type, settype] = useState('')
    const [data, setdata] = useState(null) //Display cropped pic
    const [imgData, setimgData] = useState('') //Set Image data for cropper

    const onChangePic = (e) => {
        e.preventDefault()
        let lastDotIndex = e.target.value.lastIndexOf('.')
        settype(e.target.value.substring(lastDotIndex))
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
            //   setprofile(JSON.parse(localStorage.getItem("Profile")).result.profile)
        } catch (e) {
            navigate("/login")
        }
    }, [])
    const handleClose = () => {
        // 
        dispatch(redirect("/", navigate))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!caption && !data) {
            return alert("Please enter the required data")
        }
        setIsLoading(true)
        dispatch(newPost({ data, caption, type }, navigate, setIsLoading))
    }
    return <>
        <div className="form-parent">
            <div className="profile-bio-update-form">
                <div onClick={handleClose} className="close-btn"><FontAwesomeIcon icon={faClose} /></div>
                {
                    isLoading ?
                        <Loader /> : <></>
                }
                {
                    VisibleCropper ?
                        <ImageCrop image={imgData} setCropData={setdata} setVisibleCropper={setVisibleCropper} /> : <></>
                }
                <form action="" onSubmit={handleSubmit}>
                    <div className="profile-img-selector">
                        <img src={!data ? addpost : data} alt="Uploaded profile" className='post-preview-img' />
                        <div className="text-muted">Please choose an image or video to post <FontAwesomeIcon icon={faInfoCircle} title="Please select image less than 2mb for better performance for now" /></div>
                        <input accept='image/*' type="file" name="" id="" onChange={onChangePic} />
                    </div>
                    <div className="bio-update">
                        <div className="text-muted">Caption </div>
                        <textarea placeholder='Give an caption to your post...' className='text-bio' onChange={(e => setCaption(e.target.value))} name="bio" id="bio" rows={4} value={caption}></textarea>
                    </div>
                    <div className="center">
                        <button type='submit' className='update-profile-bio-btn'>Post to {BrandName} <FontAwesomeIcon icon={faAngleRight} /></button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default ProfileBioForm