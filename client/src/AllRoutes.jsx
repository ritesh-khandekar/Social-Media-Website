import React from 'react'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { redirect } from './actions/redirect'
import LeftSidebar from './components/LeftSidebar'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import FriendRequests from './pages/friends/FriendRequests'
import AllFriends from './pages/friends/AllFriends'
import FriendSuggestions from './pages/friends/FriendSuggestions'
import Home from './pages/Home'
import EditProfileDetails from './pages/user/EditProfileDetails'
import Profile from './pages/user/Profile'
import ProfileBioForm from './pages/user/ProfileBioForm'
import './site.css'
import SentRequests from './pages/friends/SentRequests'
import CreatePost from './pages/posts/CreatePost'
import PostList from './pages/posts/PostList'
import FeedPosts from './pages/posts/FeedPosts'
import UserPosts from './pages/posts/UserPosts'

const AllRoutes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sidebarOpen = useSelector((state) => state.sidebarReducer)
    // console.log(sidebarOpen)
    const login = localStorage.getItem("Profile")
    useEffect(() => {
        try {
            const profile = JSON.parse(localStorage.getItem("Profile")).result._id
        } catch (err) {
            dispatch(redirect('/login', navigate))
        }
    }, [])
    useLayoutEffect(() => {
        if (window.innerWidth < 600) {
            dispatch({ type: 'SIDEBAR_CLOSE' })
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className="flex-container">
                {
                    sidebarOpen ?
                        <LeftSidebar /> : <></>
                }
                <Routes>
                {
                    login ?
                    <Route path='/' element={<FeedPosts />} />:
                    <Route path='/' element={<Login />} />
                }
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/logout' element={<Logout />} />

                    <Route path='/bioupdate' element={<ProfileBioForm />} />
                    <Route path='/profileedit' element={<EditProfileDetails />} />
                    <Route path='/profile' key={window.location.href} element={<Profile />} />
                    <Route path='/profile/:id' key={window.location.href} element={<Profile />} />

                    <Route path='/friendsuggestions' element={<FriendSuggestions />} />
                    <Route path='/friendrequests' element={<FriendRequests />} />
                    <Route path='/allfriends' element={<AllFriends />} />
                    <Route path='/sentrequests' element={<SentRequests />} />

                    <Route path='/test' element={<PostList />} />
                    <Route path='/posts/:friendId' element={<UserPosts />} />
                    <Route path='/posts' element={<UserPosts />} />
                    <Route path='/createpost' element={<CreatePost />} />
                </Routes>
                {
                    window.innerWidth > 500 ?
                    <Profile />:<></>
                }
            </div>
        </>
    )
}

export default AllRoutes
