const defaultState={
    articleDetail: {
        zanNum: 0,
        isZan: false
    }
}
export default (state=defaultState,action)=>{
    if(action.type==="zan"){
        return {
            articleDetail: {
                zanNum: 1,
                isZan: true
            }
        }
    }
    if(action.type==="cancelZan"){
        return {
            articleDetail: {
                zanNum: 0,
                isZan: false
            }
        }
    }
    return state
}