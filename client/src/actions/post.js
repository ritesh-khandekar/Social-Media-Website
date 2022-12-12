import { useSelector } from 'react-redux'
import * as api from '../api'

export const newPost = (postData, navigate, setisLoading) => async (dispatch) => {
    try {
        await api.newPost(postData)
        setisLoading(false)
        navigate("/")
    } catch (error) {
        
        setisLoading(false)
    }
}
export const getFeedPosts = (setFeedPosts, setisLoading) => async (dispatch) => {
    try {
        const { data } = await api.getFeedPosts()
        setFeedPosts(data.feedPosts)
        setisLoading(false)
    } catch (error) {
        
        setisLoading(false)
    }
}
export const getUserPosts = (setFeedPosts, setisLoading, friend='') => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("Profile")).result._id
        const { data } = await api.getUserPosts(friend=='' ? user: friend)

        setFeedPosts(data.userPosts)
        setisLoading(false)
    } catch (error) {
        
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
        
        setisLoading(false)
    }
}
export const deletePost = (postId, setisLoading) => async (dispatch) => {
    try {
        await api.deletePost(postId)
        setisLoading(false)
    } catch (error) {
        
        alert("Failed to delete the post")
        setisLoading(false)
    }
}