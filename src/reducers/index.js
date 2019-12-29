
import { combineReducers } from 'redux'
import auth from './auth'
import profilePicture from './profilePicture'
import profile from './profile'

const rootReducer = combineReducers({
  auth,
  profilePicture,
  profile
})

export default rootReducer
