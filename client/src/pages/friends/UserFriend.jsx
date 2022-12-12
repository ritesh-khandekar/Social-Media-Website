import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import defaultProfile from '../../assets/profile/user.png'
import './friends.css'

const UserFriend = ({ friendData, removeFriend, deleteFriend, acceptFriendRequest = () => { }, addFriend, sentRequest = false, alreadyFriend = false, acceptFriend = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [friendExist, setFriendExist] = useState(alreadyFriend)
  const [requestSent, setRequestSent] = useState(sentRequest)
  const [acceptFriendL, setacceptFriendL] = useState(acceptFriend)
  const handleFriendClick = () => {
    navigate("/profile/" + friendData._id)
  }
  return <>
    <div className="friend-container">
      <div className="friend-profile-pic" onClick={handleFriendClick}>
        <img src={friendData.profile ? friendData.profile : defaultProfile} alt="Friend" className='friend-profile-img' />
      </div>
      <div className="friend-info">
        <h3 onClick={handleFriendClick}>{friendData.fname} {friendData.lname}</h3>
        <div className="btn-group">
          {
            acceptFriendL ? <>
              <button className='add-friend-btn' onClick={(e) => { acceptFriendRequest(friendData._id); setFriendExist(true); setacceptFriendL(false) }}>Accept friend request</button>
            </> :
              (
                requestSent ?
                  <button className='remove-btn' onClick={(e) => { deleteFriend(friendData._id); setRequestSent(false) }}>Remove friend request</button>
                  :
                  (friendExist ? <>
                    <button className='friends-btn'>Friends</button>
                    <button className='unfriend-btn' onClick={(e) => { deleteFriend(friendData._id); setFriendExist(false) }}>Remove friend</button>
                  </> : <>
                    <button className='add-friend-btn' onClick={(e) => { addFriend(friendData._id); setRequestSent(true) }}>+Add friend</button>
                    <button className='remove-btn' onClick={(e) => removeFriend(friendData._id)}>Remove</button>
                  </>)
              )
          }

        </div>
      </div>
    </div>
  </>
}

export default UserFriend