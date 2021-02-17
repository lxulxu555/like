const init = {
    newsData:{},
    loading:true
}

export default(state = init,action) => {
    switch (action.type) {
        case 'SAVE_ALLNEWS' :
            return {...state,newsData:action.allNews}
        case 'NEWS_LOADING' :
            return {...state,loading:action.loading}
        default :
            return state
    }
}