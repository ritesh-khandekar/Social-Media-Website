import { faBars, faClose, faDeleteLeft, faEdit, faEllipsisH, faHandDots, faListDots, faRemove, faShare, faThumbsUp, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import moment from 'moment'
import defaultProfile from '../../assets/profile/user.png'
import './post.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/post'
import { useState } from 'react'
import { BrandName, BrandURL } from '../../components/Brand'

const Post = ({ profile, data, likes, caption, time, fname, lname, by, _id, validUser = false, setPostList, userLiked = false, setisLoading }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = JSON.parse(localStorage.getItem("Profile"))
    if(!id){
        id.result = {}
        id.result._id = ''
    }
    const [likeCount, setLikeCount] = useState(likes.length - likes.includes(id?.result?._id))
    const [isLiked, setIsLiked] = useState(likes.includes(id?.result?._id))
    
    const handleClose = (e) => {

    }
    const handleLike = (e) => {
        setisLoading(true)
        dispatch(likePost(_id, setisLoading, setIsLiked))
    }
    const handleShare = (e) => {
        const link = (BrandURL + "posts/" + by)
        navigator.clipboard.writeText(link)
        alert("Link copied to clipboard: " + link)
    }
    const handleDelete = (e) => {
        setisLoading(true)
        dispatch(deletePost(_id, setisLoading))
        navigate("/")
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
                    <div className="menu-btn">
                        <div className="dropdown">
                            <button className="dropbtn noactive">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </button>
                            <div className="dropdown-content dropdown-post">
                                <a onClick={viewUser}><FontAwesomeIcon icon={faUser} /> View user</a>
                                <a onClick={handleDelete} className='logout-link'><FontAwesomeIcon icon={faRemove} /> Delete post</a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="close-btn" onClick={handleClose}><FontAwesomeIcon icon={faClose} /></div> */}
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