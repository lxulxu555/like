const init = []

export default(state = init,action) => {
    switch (action.type) {
        case 'SAVE_ALLCLASS' :
            return action.allClass
        default:
            return state
    }
}