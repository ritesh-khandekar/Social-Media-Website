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
        console.log(data)
        setisLoading(false)
        setFriendRequests(data.receivedRequests)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const getSentRequests = (setSentRequests, setisLoading) => async (dispatch) => {
    try {
        const { data } = await api.getSentRequests()
        console.log(data)
        setisLoading(false)
        setSentRequests(data.sentRequests)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const getAllFriends = (setFriendRequests, setisLoading) => async (dispatch) => {
    try {
        const id = JSON.parse(localStorage.getItem('Profile')).result._id
        const { data } = await api.getAllFriends(id)
        console.log(data)
        setisLoading(false)
        setFriendRequests(data.friends)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const addFriend = (friendId, setisLoading) => async (dispatch) => {
    try {
        await api.addFriend(friendId)
        setisLoading(false)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const acceptFriend = (friendId, setisLoading) => async (dispatch) => {
    try {
        await api.acceptFriend(friendId)
        setisLoading(false)
    } catch (error) {
        console.log(error)
        setisLoading(false)
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