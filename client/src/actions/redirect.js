export const rediirect = (url, navigate) => async (dispatch) => {
    try {
        navigate(url)
    } catch (error) {
        console.log(error)
    }
}
