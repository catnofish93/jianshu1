const defaultState = {
    id: '',
    name: '',
    phone: '',
    sex: '',
    age: '',
    img: ''
}
export default (state = defaultState, action) => {
  if (action.type === 'loginUser') {
    return Object.assign({}, state, action.data)
  }
  return state
}
