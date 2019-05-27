const getters = {  // computed와 유사한 속성
    isAuth(state) {
        return !!state.token
    }
}

export default getters