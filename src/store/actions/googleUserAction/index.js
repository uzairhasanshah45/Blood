function setGoglUser(user) {

    return {
        type: 'SET_USER',
        data: user
    }
}

function unsetGoglUser() {
    return {
        type: 'UNSET_USER'
    }
}

export {
    setGoglUser,
    unsetGoglUser
}