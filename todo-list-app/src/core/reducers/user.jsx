import _ from 'lodash'

import User from "../models/user"
import Storage from "../../utils/storage"

export const ActionTypes = {
	Login: 'User/Login',
	LoginSuccess: 'User/LoginSuccess',
	LoginFailure: 'User/LoginFailure',

	Register: 'User/Register',
	RegisterSuccess: 'User/RegisterSuccess',
	RegisterFailure: 'User/RegisterFailure',

	GetProfile: 'User/GetProfile',
	GetProfileSuccess: 'User/GetProfileSuccess',
	GetProfileFailure: 'User/GetProfileFailure',

	GetTodos: 'User/GetTodos',
	GetTodosSuccess: 'User/GetTodosSuccess',
	GetTodosFailure: 'User/GetTodosFailure',

	Reset: 'User/Reset',
}

const initialState = {
	isLoading: false,
	currentUser: undefined,
	apiError: undefined
}

const userManager = (state = initialState, action) => {
	const newState = _.cloneDeep(state)
	switch (action.type) {
		case ActionTypes.Login:
		case ActionTypes.Register:
		case ActionTypes.GetProfile: {
			newState.isLoading = true
			newState.apiError = undefined
			break
		}
		case ActionTypes.GetTodos: {
			newState.isLoading = true
			newState.apiError = undefined
			break
		}
		case ActionTypes.LoginSuccess:
		case ActionTypes.RegisterSuccess: {
			newState.isLoading = false

			const currentUser = User.fromJSON(action.response)
			newState.currentUser = currentUser
			Storage.saveAccessToken(currentUser.accessToken)
			Storage.setRefreshToken(currentUser.refreshToken)
			break
		}
		case ActionTypes.GetProfileSuccess: {
			newState.isLoading = false
			newState.currentUser = User.fromJSON(action.response)
			break
		}
		case ActionTypes.GetTodosSuccess: {
			newState.isLoading = false
			newState.currentUser = User.fromJSON(action.response)
			break
		}
		case ActionTypes.LoginFailure:
		case ActionTypes.RegisterFailure:
		case ActionTypes.GetProfileFailure: {
			newState.isLoading = false
			newState.currentUser = undefined
			newState.apiError = action.error
			break
		}
		case ActionTypes.GetTodosFailure: {
			newState.isLoading = false
			newState.currentUser = undefined
			newState.apiError = action.error
			break
		}
		case ActionTypes.Reset: {
			newState.isLoading = false
			newState.currentUser = undefined
			newState.apiError = undefined
			Storage.saveAccessToken(undefined)
			Storage.setRefreshToken(undefined)
			break
		}
	}
	return newState
}

export function actionLogin(email, password) {
	return {type: ActionTypes.Login, payload: {email: email, password: password}}
}

export function actionRegister(payload) {
	return {type: ActionTypes.Register, payload: payload}
}

export function actionGetProfile(payload) {
	return {type: ActionTypes.GetProfile, payload: payload}
}

export function actionGetTodos(payload) {
	return {type: ActionTypes.GetTodos, payload: payload}
}

export function actionReset() {
	return { type: ActionTypes.Reset }
}

export default userManager
