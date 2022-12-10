import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { acceptFriend, addFriend, deleteFriend, getSentRequests } from '../../actions/friend.js'
import UserFriend from './UserFriend'
import Loader from '../../components/Loader'
import './friends.css'

const SentRequests = () => {
    const dispatch = useDispatch()
    const [SentRequests, setSentRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getSentRequests(setSentRequests, setIsLoading))
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
                SentRequests ? (
                    SentRequests.length > 0 ?
                        SentRequests.map((friend, id) => <UserFriend key={id} sentRequest={true} acceptFriendRequest={acceptFriendRequest} addFriend={addNewFriend} deleteFriend={deleteOldFriend} removeFriend={removeOldFriend} friendData={friend} />) :
                        <div className="no-friends">No requests sent</div>
                ) :
                    <div className="no-friends">
                        Failed to fetch friend Requests
                    </div>
            }
        </div>
    </>
}

export default SentRequests