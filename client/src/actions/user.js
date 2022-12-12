import * as api from '../api'

export const updateProfile = (profileData, navigate, setisLoading, setComponentVisible) => async (dispatch) => {
    try {
        const profile = JSON.parse(localStorage.getItem("Profile"))
        const id = profile.result._id;
        const { data } = await api.updateProfile(profileData, id)
        profile.result = { ...profile.result, ...data }
        localStorage.setItem("Profile", JSON.stringify(profile))
        setComponentVisible(false)
        setisLoading(false)
        navigate('/profile')
    } catch (error) {
        setisLoading(false)
    }
}
export const getProfile = (setProfile, setisLoading, navigate, profileID) => async (dispatch) => {
    try {
        const { data } = await api.getProfile(profileID)
        // dispatch({ type: 'AUTH', data })
        setisLoading(false)
        setProfile(data.result)
        // dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        navigate("/login")
        setisLoading(false)
        
    }
}