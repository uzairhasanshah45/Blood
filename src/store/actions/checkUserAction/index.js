function setCkUser(user) {

    return {
        type: 'SET_USER',
        data: user
    }
}

function unsetCkUser() {
    return {
        type: 'UNSET_USER'
    }
}

export {
    setCkUser,
    unsetCkUser
}