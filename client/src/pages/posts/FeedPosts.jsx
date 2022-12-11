import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getFeedPosts } from '../../actions/post'
import Loader from '../../components/Loader'
import Post from './Post'
import './post.css'

const FeedPosts = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [postList, setPostList] = useState([])

    useEffect(() => {
        setIsLoading(true)
        dispatch(getFeedPosts(setPostList, setIsLoading))
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

export default FeedPosts