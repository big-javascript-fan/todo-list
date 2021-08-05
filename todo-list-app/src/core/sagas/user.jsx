import { call, put, takeLatest } from 'redux-saga/effects'

import Api, { onSuccess, onFailure } from '../api'
import User from "../models/user"
import { ActionTypes } from "../reducers/user"

export function* watchLogin() { yield takeLatest(ActionTypes.Login, login) }
function* login(action) {
	try {
		const request = () => Api.post("/login", action.payload)
		const response = yield call(request)
		const { success, data, message } = response
		if (!success || message) {
			yield put(onFailure(ActionTypes.LoginFailure, message))
			return
		}
		yield put(onSuccess(ActionTypes.LoginSuccess, data))

	} catch (error) {
		console.log(error)
		yield put(onFailure(ActionTypes.LoginFailure, Api.parseError(error, 'Sorry, there is a trouble to login. Please try again later.')))
	}
}

export function* watchRegister() { yield takeLatest(ActionTypes.Register, register) }
function* register(action) {
	try {
		const request = () => Api.post("/signup", action.payload)
		const response = yield call(request)
		const { success, data, message } = response
		if (!success || message) {
			yield put(onFailure(ActionTypes.RegisterFailure, message))
			return
		}
		yield put(onSuccess(ActionTypes.RegisterSuccess, data))

	} catch (error) {
		console.log(error)
		yield put(onFailure(ActionTypes.RegisterFailure, Api.parseError(error, 'Sorry, there is trouble to create account. Please try again later.')))
	}
}


export function* watchGetProfile() { yield takeLatest(ActionTypes.GetProfile, getProfile) }
function* getProfile(action) {
	try {
		let request = () => Api.get("/get-profile")
		let response = yield call(request)
		const { success, data, message } = response
		if (!success || message) {
			yield put(onFailure(ActionTypes.GetProfileFailure, message))
			return
		}
		yield put(onSuccess(ActionTypes.GetProfileSuccess, data))

	} catch (error) {
		console.log(error)
		yield put(onFailure(ActionTypes.GetProfileFailure, Api.parseError(error, 'Sorry, there is trouble to get profile. Please try again later.')))
	}
}

export function* watchGetTodos() { yield takeLatest(ActionTypes.GetTodos, getTodos) }
function* getTodos(action) {
	try {
		let request = () => Api.get("/get-todos")
		let response = yield call(request)
		const { success, data, message } = response
		if (!success || message) {
			yield put(onFailure(ActionTypes.GetTodosFailure, message))
			return
		}
		yield put(onSuccess(ActionTypes.GetTodosSuccess, data))

	} catch (error) {
		console.log(error)
		yield put(onFailure(ActionTypes.GetTodosFailure, Api.parseError(error, 'Sorry, there is trouble to get. Please try again later.')))
	}
}
