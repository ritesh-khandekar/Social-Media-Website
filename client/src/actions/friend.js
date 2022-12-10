import * as api from '../api'

export const getFriendSuggestions = (setFriendSuggestions, setisLoading, navigate) => async (dispatch) => {
    try {
        const { data } = await api.getFriendSuggestions()
        setisLoading(false)
        setFriendSuggestions(data.friends)
    } catch (error) {
        navigate("/login")
        console.log(error)
    }
}
export const getFriendRequests = (setFriendRequests, setisLoading) => async (dispatch) => {
    try {
        const { data } = await api.getFriendRequests()
        setisLoading(false)
        setFriendRequests(data.friends)
    } catch (error) {
        console.log(error)
    }
}
export const addFriend = (friendId, setisLoading) => async (dispatch) => {
    try {
        await api.addFriend(friendId)
        setisLoading(false)
    } catch (error) {
        console.log(error)
    }
}
export const deleteFriend = (friendId, setisLoading, setfriendExist) => async (dispatch) => {
    try {
        await api.deleteFriend(friendId)
        setisLoading(false)
        setfriendExist(true)
    } catch (error) {
        setfriendExist(false)
        console.log(error)
    }
}