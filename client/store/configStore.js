import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)

export default store
