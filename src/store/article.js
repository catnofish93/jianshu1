const defaultState = []
export default (state = defaultState, action) => {
  if (action.type === 'setArticle') {
    console.log(action.data)
    return action.data
  }
  return state
}
