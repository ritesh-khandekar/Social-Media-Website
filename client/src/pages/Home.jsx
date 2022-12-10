import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from './../actions/redirect'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'
import { useLayoutEffect } from 'react'

const Home = () => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const sidebarOpen = useSelector((state) => state.sidebarReducer)
  // console.log(sidebarOpen)
  // useEffect(() => {
  //   try {
  //     const profile = JSON.parse(localStorage.getItem("Profile")).result._id
  //   } catch (err) {
  //     dispatch(redirect('/login', navigate))
  //   }
  // }, [])
  // useLayoutEffect(()=>{
  //   if(window.innerWidth < 600){
  //     dispatch({ type: 'SIDEBAR_CLOSE'})
  //   }
  // },[])
  return <>
    {/* <Navbar />
    {
      sidebarOpen ?
        <LeftSidebar /> : <></>
    } */}
    
  </>
}

export default Home