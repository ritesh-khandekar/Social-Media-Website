import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addFriend, deleteFriend, getAllFriends } from '../../actions/friend'
import UserFriend from './UserFriend'
import Loader from '../../components/Loader'
import './friends.css'

const AllFriends = () => { //Id should be passed
    const dispatch = useDispatch()
    const [AllFriends, setAllFriends] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getAllFriends(setAllFriends, setIsLoading))
    }, [])
    const deleteOldFriend = (friendId, setFriendExist = () => { }) => {
        setIsLoading(true)
        dispatch(deleteFriend(friendId, setIsLoading, setFriendExist))
    }
    const addNewFriend = (friendId) => {
        setIsLoading(true)
        dispatch(addFriend(friendId, setIsLoading))
    }
    const removeOldFriend = (friendId) => {
        setAllFriends(friendSuggestions => friendSuggestions.filter(friend => friend._id !== friendId))
    }
    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="friends-container">
            {
                AllFriends ? (
                    AllFriends.length > 0 ?
                        AllFriends.map((friend, id) => <UserFriend key={id} addFriend={addNewFriend} removeFriend={removeOldFriend} alreadyFriend={true} deleteFriend={deleteOldFriend} friendData={friend} />) :
                        <div className="no-friends">No friends</div>
                ) :
                    <div className="no-friends">
                        Failed to fetch friend suggestions
                    </div>
            }
        </div>
    </>
}

export default AllFriends