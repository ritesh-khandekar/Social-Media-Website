import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteFriend, getFriendSuggestions } from '../../actions/friend'
import { addFriend } from '../../actions/friend'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import UserFriend from './UserFriend'
import './friends.css'

const FriendSuggestions = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [friendSuggestions, setFriendSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getFriendSuggestions(setFriendSuggestions, setIsLoading, navigate))
    }, [])

    const addNewFriend = (friendId) => {
        setIsLoading(true)
        dispatch(addFriend(friendId, setIsLoading))
    }
    const deleteOldFriend = (friendId, setFriendExist = () => { }) => {
        setIsLoading(true)
        dispatch(deleteFriend(friendId, setIsLoading, setFriendExist))
    }
    const removeOldFriend = (friendId) => {
        setFriendSuggestions(friendSuggestions => friendSuggestions.filter(friend => friend._id !== friendId))
    }
    // console.log(friendSuggestions)
    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="friends-container">
            {
                friendSuggestions ? (
                    friendSuggestions.length > 0 ?
                        friendSuggestions.map((friend, id) => <UserFriend key={id} addFriend={addNewFriend} deleteFriend={deleteOldFriend} removeFriend={removeOldFriend} friendData={friend} />) :
                        <div className="no-friends">No friend suggestions</div>
                ) :
                    <div className="no-friends">
                        Failed to fetch friend suggestions
                    </div>
            }
        </div>
    </>
}

export default FriendSuggestions