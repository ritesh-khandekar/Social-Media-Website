import React from 'react'
import { useState } from 'react'
import { login } from '../../actions/auth'
import { BrandName } from '../../components/Brand'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './auth.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [passsword, setPasssword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !passsword) return alert("Please enter email and password")
    dispatch(login({ email, passsword }, navigate))
  }
  return <>
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
              <input type="email" placeholder='Email address or phone number' onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
              <input type="password" placeholder='Password' onChange={(e) => setPasssword(e.target.value)} name="password" id="password" />
              <input type="submit" value="Log In" />
              <div className="forget-password">
                Forgotten Password?
              </div>
            </form>
            <hr />
            <button className="signup-btn">
              Create new account
            </button>
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