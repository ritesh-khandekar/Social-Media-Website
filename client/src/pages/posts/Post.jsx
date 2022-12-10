import { faBars, faClose, faEllipsisH, faHandDots, faListDots, faShare, faThumbsUp, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import profile from '../../assets/profile/user.png'
import './post.css'

const Post = () => {
    return <>
        <div className="post-container">
            <div className="post-user-details">
                <div className="user-icon">
                    <img src={profile} alt="Profile" className='post-profile-img' />
                </div>
                <div className="post-name-date">
                    <div className="post-user-name">Test test</div>
                    <div className="post-date">04 Jan 2003 <FontAwesomeIcon icon={faUserFriends} /></div>
                </div>
                <div className="post-menu">
                    <div className="close-btn"><FontAwesomeIcon icon={faEllipsisH} /></div>
                    <div className="menu-btn"><FontAwesomeIcon icon={faClose} /></div>
                </div>
            </div>
            <div className="post-content">
                <img src={profile} alt="Profile" width={"100%"}/>
            </div>
            <div className="post-caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique cum velit quibusdam quidem qui deleniti accusamus, hic facere natus, dolores numquam nesciunt iusto, nobis eligendi quis culpa ducimus vitae nihil!
            </div>
            <hr />
            <div className="user-interaction-container">
                <div className="post-like-btn"><FontAwesomeIcon className='post-icons' icon={faThumbsUp} /> Like</div>
                <div className="post-share-btn"><FontAwesomeIcon className='post-icons' icon={faShare} /> Share</div>
            </div>
        </div>
    </>
}

export default Post