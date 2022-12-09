import React from 'react'
import { useState } from 'react'
import { signup } from '../../actions/auth'
import { BrandName } from '../../components/Brand'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import './auth.css'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [fname, setfname] = useState("")
  const [lname, setlname] = useState("")
  const [phone, setphone] = useState("")
  const [birthdate, setbirthdate] = useState("")
  const [gender, setgender] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || !fname || !lname || !gender || !phone || !birthdate) return alert("Please enter all the details")
    setIsLoading(true)
    dispatch(signup({ email, password, fname, lname, gender, phone, birthdate }, navigate, setIsLoading))
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
          <div className="signup-form">
            <form action="" onSubmit={handleSubmit}>
              <h1 className='signup-header'>Sign Up</h1>
              <p>It's quick and easy</p>
              <hr />
              <div className="input-row">
                <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} placeholder='First name' />
                <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} placeholder='Surname' />
              </div>
              <input type="tel" name="phone" value={phone} onChange={(e) => setphone(e.target.value)} placeholder='Mobile number' id="phone" />
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' id="email" />
              <input type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='New password' id="password" />

              <p className='text-muted'>Date of birth</p>
              <input type="date" value={birthdate} onChange={(e) => setbirthdate(e.target.value)} min={"1950-01-01"} max={"2015-01-01"} name="" id="" />

              <p className='text-muted'>Gender</p>
              <div className='gender-selector'>
                <input type="radio" onChange={(e) => setgender(e.target.checked ? "male" : "female")} name="gender" id="maleGender" />
                <label htmlFor="maleGender">Male</label>
                <input type="radio" onChange={(e) => setgender(e.target.checked ? "female" : "male")} name="gender" id="femaleGender" />
                <label htmlFor="femaleGender">Female</label>
              </div>

              <p className="text-muted-small">
                People who use our service may have uploaded your contact information to {BrandName}.
              </p>
              <p className="text-muted-small">
                By clicking Sign Up, you agree to out <b>Terms, Privacy Policy and Cookie Policy</b> You may receive SMS notifications from us and ca opt out at any time
              </p>

              <div className="center">
                <input type="submit" value={"Sign Up"} className="signup-btn" />
              </div>
            </form>
          </div>
          <div className="forget-password" style={{ textAlign: "center" }}>
            Already have account? <Link to={"/login"} className='login-btn-link'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default SignUp