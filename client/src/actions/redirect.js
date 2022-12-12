export const redirect = (url, navigate) => async (dispatch) => {
    try {
        navigate(url)
    } catch (error) {
        
    }
}
