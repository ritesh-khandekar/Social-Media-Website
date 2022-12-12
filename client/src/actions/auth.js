import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup = (authData, navigate, setisLoading) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData)
        dispatch({ type: 'AUTH', data})
        setisLoading(false)
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        navigate('/')
    } catch (error) {
        setisLoading(false)
        
    }
}

export const login = (authData, navigate, setisLoading, setloginError) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({ type: 'AUTH', data})
        setisLoading(false)
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        // navigate('/')
        window.location.href = "/"
    } catch (error) {
        
        setloginError(<div className='error'>Incorrect email ID or password</div>)
        setisLoading(false)
    }
}
