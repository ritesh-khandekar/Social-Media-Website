import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserPosts } from '../../actions/post'
import Loader from '../../components/Loader'
import Post from './Post'
import './post.css'

const UserPosts = () => {
    const dispatch = useDispatch()
    let params = useParams()
    // const user = JSON.parse(localStorage.getItem("Profile"))
    let friendId = '';
    // let friendId = user?.result?._id
    if (params.friendId) {
        friendId = params.friendId
    }
    // console.log(params)

    const [isLoading, setIsLoading] = useState(false)
    const [postList, setPostList] = useState([])
    useEffect(() => {
        setIsLoading(true)
        dispatch(getUserPosts(setPostList, setIsLoading, friendId))
    }, [])

    return <>
        {isLoading ? <Loader /> : <></>}
        <div className="post-list-container">
            {
                postList ? (
                    postList.length > 0 ?
                        postList.map((post, i) => <Post key={i} {...post} postList={postList} setisLoading={setIsLoading} setPostList={setPostList} />) :
                        <div className="posts-failed">No posts by friends</div>
                ) :
                    <div className="posts-failed">Failed to fetch posts</div>
            }
        </div>
    </>
}

export default UserPosts