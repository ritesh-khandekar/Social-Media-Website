const sidebarReducer = (state= true, action) => {
    switch (action.type) {
        case 'SIDEBAR':
            return !state
        case 'SIDEBAR_CLOSE':
            return false
        default:
            return window.innerWidth > 600;
    }
}

export default sidebarReducer