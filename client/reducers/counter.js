const initialState = {
  count: 0
}

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: ++state.count
      }
    default:
      return state;
  }
}

export default counter
