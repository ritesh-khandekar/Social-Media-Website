import React from 'react'
import { useState } from 'react'
import defaultProfile from '../../assets/profile/user.png'
import './friends.css'

const UserFriend = ({ friendData, removeFriend, deleteFriend, addFriend }) => {
  const [friendExist, setFriendExist] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  return <>
    <div className="friend-container">
      <div className="friend-profile-pic">
        <img src={friendData.profile ? friendData.profile : defaultProfile} alt="Friend" width={"80px"} className='friend-profile-img' />
      </div>
      <div className="friend-info">
        <h3>{friendData.fname} {friendData.lname}</h3>
        <div className="btn-group">
          {
            requestSent ?
              <button className='remove-btn' onClick={(e) => { deleteFriend(friendData._id); setRequestSent(false) }}>Remove friend request</button>
              :
              (friendExist ? <>
                <button className='friends-btn'>Friends</button>
                <button className='unfriend-btn' onClick={(e) => deleteFriend(friendData._id)}>Remove friend</button>
              </> : <>
                <button className='add-friend-btn' onClick={(e) => { addFriend(friendData._id); setRequestSent(true) }}>+Add friend</button>
                <button className='remove-btn' onClick={(e) => removeFriend(friendData._id)}>Remove</button>
              </>)
          }

        </div>
      </div>
    </div>
  </>
}

export default UserFriend