import * as api from '../api'

export const updateProfile = (profileData, navigate, setisLoading) => async (dispatch) => {
    try {
        const id = JSON.parse(localStorage.getItem("Profile")).result._id;
        const { data } = await api.updateProfile(profileData, id)
        setisLoading(false)
        navigate('/profile')
    } catch (error) {
        console.log(error)
    }
}