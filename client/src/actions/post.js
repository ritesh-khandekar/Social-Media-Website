import { useSelector } from 'react-redux'
import * as api from '../api'

export const newPost = (postData, navigate, setisLoading) => async (dispatch) => {
    try {
        await api.newPost(postData)
        setisLoading(false)
        navigate("/")
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const getFeedPosts = (setFeedPosts, setisLoading) => async (dispatch) => {
    try {
        const { data } = await api.getFeedPosts()
        setFeedPosts(data.feedPosts)
        setisLoading(false)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}
export const likePost = (postId, setisLoading, setLiked) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId)
        const id = JSON.parse(localStorage.getItem("Profile"))
        setLiked(data.result.likes.includes(id?.result?._id))
        setisLoading(false)
    } catch (error) {
        console.log(error)
        setisLoading(false)
    }
}