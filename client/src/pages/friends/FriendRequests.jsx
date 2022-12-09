import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getFriendSuggestions } from '../../actions/friend'
import Loader from '../../components/Loader'

const FriendRequests = () => {
    const dispatch = useDispatch()
    const [friendSuggestions, setFriendSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getFriendSuggestions(setFriendSuggestions, setIsLoading))
    }, [])
    
    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="suggestions-container">

        </div>
    </>
}

export default FriendRequests