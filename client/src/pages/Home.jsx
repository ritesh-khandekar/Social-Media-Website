import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { rediirect } from './../actions/redirect'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'
import { useReducer } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sidebarOpen = useReducer((state) => state.sidebarReducer)
  console.log(sidebarOpen)
  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("Profile")).result._id
    } catch (err) {
      dispatch(rediirect('/login', navigate))
    }
  }, [])
  return <>
    <Navbar />
    {
      sidebarOpen ?
        <LeftSidebar /> : <></>
    }
  </>
}

export default Home