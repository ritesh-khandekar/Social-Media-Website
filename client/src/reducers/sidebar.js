const sidebarReducer = (state= true, action) => {
    switch (action.type) {
        case 'SIDEBAR':
            return !state
        default:
            return false;
    }
}

export default sidebarReducer