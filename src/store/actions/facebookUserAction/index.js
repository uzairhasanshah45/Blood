function setFbUser(user) {

    return {
        type: 'SET_USER',
        data: user
    }
}

function unsetFbUser() {
    console.log('logout hua')
    return {
        type: 'UNSET_USER'
    }
}

export {
    setFbUser,
    unsetFbUser
}