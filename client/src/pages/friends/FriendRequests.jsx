import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { acceptFriend, addFriend, deleteFriend, getFriendRequests } from '../../actions/friend.js'
import UserFriend from './UserFriend'
import Loader from '../../components/Loader'
import './friends.css'

const FriendRequests = () => {
    const dispatch = useDispatch()
    const [friendRequests, setfriendRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getFriendRequests(setfriendRequests, setIsLoading))
    }, [])
    
    const deleteOldFriend = (friendId, setFriendExist = () => { }) => {
        setIsLoading(true)
        dispatch(deleteFriend(friendId, setIsLoading, setFriendExist))
    }
    const addNewFriend = (friendId) => {
        setIsLoading(true)
        dispatch(addFriend(friendId, setIsLoading))
    }
    const acceptFriendRequest = (friendId) => {
        setIsLoading(true)
        dispatch(acceptFriend(friendId, setIsLoading))
    }

    const removeOldFriend = (friendId) => {
        // setFriendSuggestions(friendSuggestions => friendSuggestions.filter(friend => friend._id !== friendId))
    }

    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="friends-container">
            {
                friendRequests ? (
                    friendRequests.length > 0 ?
                        friendRequests.map((friend, id) => <UserFriend key={id} acceptFriendRequest={acceptFriendRequest} addFriend={addNewFriend} acceptFriend={true} deleteFriend={deleteOldFriend} removeFriend={removeOldFriend} friendData={friend} />) :
                        <div className="no-friends">No friend Requests</div>
                ) :
                    <div className="no-friends">
                        Failed to fetch friend Requests
                    </div>
            }
        </div>
    </>
}

export default FriendRequests