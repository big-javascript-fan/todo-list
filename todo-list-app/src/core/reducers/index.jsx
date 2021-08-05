import {combineReducers} from 'redux'

import userManager from "./user"

const reducers = {
	users: userManager,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
