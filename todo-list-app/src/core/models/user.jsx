import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Type, plainToClass } from "class-transformer"

import { actionLogin, actionRegister, actionGetProfile, actionReset } from "../reducers/user"
import { isValidText } from "../../utils/helper"
import Api from "../api"
import Storage from '../../utils/storage'

export class ConnectedEmail {
	id
	userId
	email
	isPrimary
	createdAt
	updatedAt
	deletedAt

	static fromJSON(json) {
		return plainToClass(ConnectedEmail, json)
	}

	static fromJSONArray(jsonArray) {
		return jsonArray.map((json) => ConnectedEmail.fromJSON(json))
	}

}

export default class User {
	id
	firstName = ""
	lastName = ""
	email = ""
	phone = ""
	phoneVerifyCode = ""
	phoneVerifiedAt
	createdAt
	updatedAt
	deletedAt
	connectedEmails = []
	allowSupportPublisher = false
	accessToken
	refreshToken

	static fromJSON(json) {
		const result = plainToClass(User, json)
		if (json.connectedEmails) {
			result.connectedEmails = ConnectedEmail.fromJSONArray(json.connectedEmails)
		}
		return result
	}

	static fromJSONArray(jsonArray) {
		return jsonArray.map((json) => User.fromJSON(json))
	}

	isLoggedIn() {
		return isValidText(this.accessToken, true)
	}

	isVerified() {
		const primaryEmails = this.connectedEmails.filter(e => e.isPrimary)
		if (primaryEmails.length <= 0) { return false }
		const primaryEmail = primaryEmails[0]
		return primaryEmail.isVerified()
	}

	personalEmail() {
		const primaryEmails = this.connectedEmails.filter(e => e.isPrimary)
		return (primaryEmails.length > 0) ? primaryEmails[0] : undefined
	}

	businessEmails() {
		return this.connectedEmails.filter(e => !e.isPrimary)
	}

	isPhoneVerified(newPhone = undefined) {
		if (newPhone && newPhone !== this.phone) {
			return false
		}
		return this.phoneVerifiedAt !== undefined
	}
}

export function useUser() {
	const { isUserLoading, userApiError, currentUser } = useSelector(state => ({
		isUserLoading: state.users.isLoading,
		userApiError: state.users.apiError,
		currentUser: state.users.currentUser
	}))

	const dispatch = useDispatch()
	const userLogin = useCallback((email, password) => { dispatch(actionLogin(email, password)) }, [dispatch])
	const userRegister = useCallback(payload => { dispatch(actionRegister(payload)) }, [dispatch])
	const userGetProfile = useCallback(payload => { dispatch(actionGetProfile(payload)) }, [dispatch])
	const userReset = useCallback(() => { dispatch(actionReset()) }, [dispatch])

	return { isUserLoading, userApiError, currentUser, userLogin, userRegister, userGetProfile, userReset }
}
