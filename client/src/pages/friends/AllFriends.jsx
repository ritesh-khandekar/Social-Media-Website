import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getFriendRequests } from '../../actions/friend'
import Loader from '../../components/Loader'

const AllFriends = () => { //Id should be passed
    const dispatch = useDispatch()
    const [friendRequests, setfriendRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getFriendRequests(setfriendRequests, setIsLoading))
    }, [])
    const deleteOldFriend = () => {

    }
    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="friends-container">
            {
                friendRequests ? (
                    friendRequests.length > 0 ?
                        friendRequests.map((friend, id) => <UserFriend key={id} deleteFriend={deleteOldFriend} friendData={friend} />) :
                        <div className="no-friends">No friend suggestions</div>
                ) :
                    <div className="no-friends">
                        Failed to fetch friend suggestions
                    </div>
            }
        </div>
    </>
}

export default AllFriends