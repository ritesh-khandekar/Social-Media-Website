import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { rediirect } from './../actions/redirect'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const profile =localStorage.getItem("Profile").result._id
    } catch (err) {
      dispatch(rediirect('/login', navigate))
    }
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home