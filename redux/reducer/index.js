import { combineReducers } from 'redux'
import likes from './reducer-like'
import flag from './reducer-flag'
import alert from './reducer-alert'

const rootReducer = combineReducers({
  likes, flag, alert
})
export default rootReducer;