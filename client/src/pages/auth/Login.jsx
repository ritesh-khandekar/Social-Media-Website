import React from 'react'
import { useState } from 'react'
import { login } from '../../actions/auth'
import { BrandName } from '../../components/Brand'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import './auth.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return alert("Please enter email and password")
    setIsLoading(true)
    setLoginError('')
    dispatch(login({ email, password }, navigate, setIsLoading, setLoginError))
  }
  return <>
    {
      isLoading ?
        <Loader /> : <></>
    }
    <div className="row">
      <div className="col">
        <div className="header">
          <h1 className='header-brand'>{BrandName}</h1>
          <div className="description">
            Connect with friends and world around you on the {BrandName}
          </div>
        </div>
      </div>
      <div className="col">
        <div>
          <div className="login-form">
            <form action="" onSubmit={handleSubmit}>
              {loginError}
              <input type="email" placeholder='Email address or phone number' value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
              <input type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} name="password" id="password" />
              <input type="submit" value="Log In" />
              <div className="forget-password">
                Forgotten Password?
              </div>
            </form>
            <hr />
            <Link to={"/signup"} className="signup-btn">
              Create new account
            </Link >
          </div>
          <p className="page-info">
            <b>Create a Page</b> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  </>
}

export default Login