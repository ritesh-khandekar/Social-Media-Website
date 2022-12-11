import { faBars, faClose, faEllipsisH, faHandDots, faListDots, faShare, faThumbsUp, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import moment from 'moment'
import defaultProfile from '../../assets/profile/user.png'
import './post.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likePost } from '../../actions/post'
import { useState } from 'react'

const Post = ({ profile, data, likes, caption, time, fname, lname, by, _id, setPostList, userLiked = false, setisLoading }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = JSON.parse(localStorage.getItem("Profile"))
    const [likeCount, setLikeCount] = useState(likes.length - likes.includes(id?.result?._id))
    const [isLiked, setIsLiked] = useState(likes.includes(id?.result?._id))

    const handleClose = (e) => {

    }
    const handleLike = (e) => {
        setisLoading(true)
        dispatch(likePost(_id, setisLoading, setIsLiked))
    }
    const handleShare = (e) => {

    }
    const viewUser = (e) => {
        navigate("/profile/" + by)
    }
    return <>
        <div className="post-container">
            <div className="post-user-details">
                <div className="user-icon">
                    <img onClick={viewUser} src={profile ? profile : defaultProfile} alt="User profile" className='post-profile-img' />
                </div>
                <div className="post-name-date" onClick={viewUser}>
                    <div className="post-user-name">{fname} {lname}</div>
                    <div className="post-date">{moment(time).fromNow()} <FontAwesomeIcon icon={faUserFriends} /></div>
                </div>
                <div className="post-menu">
                    <div className="close-btn" onClick={handleClose}><FontAwesomeIcon icon={faEllipsisH} /></div>
                    <div className="menu-btn"><FontAwesomeIcon icon={faClose} /></div>
                </div>
            </div>
            <div className="post-content">
                <img src={data} alt="Post" width={"100%"} />
            </div>
            <div className="post-caption">
                {caption}
            </div>
            <div className="like-count">
                {likeCount + isLiked} Like(s)
            </div>
            <hr />
            <div className="user-interaction-container">
                <div className={"post-like-btn" + (isLiked ? " blue-active" : "")} onClick={handleLike}><FontAwesomeIcon className='post-icons' icon={faThumbsUp} /> Like</div>
                <div className="post-share-btn" onClick={handleShare}><FontAwesomeIcon className='post-icons' icon={faShare} /> Share</div>
            </div>
        </div>
    </>
}

export default Post