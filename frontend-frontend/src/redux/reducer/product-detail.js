const init = {
    detail:{
        images:""
    },
    loading:true
}

export default(state = init,action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL' :
            return {...state,detail:action.productDetail}
        case 'PRODUCT_DETAIL_LOADING':
            return {...state,loading:action.loading}
        default :
            return state
    }
}