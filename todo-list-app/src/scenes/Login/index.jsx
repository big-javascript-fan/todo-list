import React, { useState, useEffect } from "react";

import {TextField} from "../../components"

import './styles.scss'
import iconClose from "../../assets/images/onboard_close.svg"
import iconLock from "../../assets/images/onboard_lock.svg"


import { useUser } from "../../core/models/user"

import { isValidEmail, isValidText } from "../../utils/helper"
import Crypto from "../../utils/crypto"


export default function LoginScene(props) {
	const { isUserLoading, userApiError, currentUser, userLogin, userReset } = useUser()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorType, setErrorType] = useState("")
	const [error, setError] = useState("")
	
	useEffect(() => {
		setErrorType("")
		setError("")
	}, [email, password])

	useEffect(() => {
		if (userApiError) {
			if (userApiError.toLowerCase().includes('email')) {
				setErrorType('email')
				setError('Email is not registered to our system.')
			}
			else if (userApiError.toLowerCase().includes('password')) {
				setErrorType('password')
				setError('Password doesn\'t match our records.')
			}
			else {
				setErrorType("")
				setError('Sorry, there is a trouble to login. Please try again later.')
			}
			return
		}

		if (currentUser && currentUser.isLoggedIn()) {
			props.history.push('/dashboard')
		}
	}, [userApiError, currentUser])

	function onLoginBtnClicked() {
		if (!isValidEmail(email)) {
			setErrorType('email')
			setError('Email you input is invalid. Please confirm it is formatted properly.')
			return
		}

		const encryptedPassword = Crypto.encrypt(password)
		userLogin(email, encryptedPassword)
	}

	function onSignup() {
		userReset()
		props.history.push('/signup')
	}

	return (
		<div className="login">
			<div className="login-container">
				<div className='login-container-title'>Welcome back</div>
				<div className="login-container-form mt-48">
					<TextField id="emailInput" autoFocus placeholder="Email address" value={email}
						autoComplete
						error={errorType === "email"}
						onChange={value => setEmail(value)} />
					<TextField className="login-container-form-divider" id="passwordInput" placeholder="Password" value={password}
						password error={errorType === "password"}
						onChange={value => setPassword(value)} />
				</div>
				<div className="login-container-error">
					{isValidText(error) && error}
				</div>
			</div>
			<div className="login-bottom">
				<div className="login-bottom-button">
					<button type="button" disabled={!isValidText(email) || !isValidText(password)}
						onClick={onLoginBtnClicked}>
						Log in
					</button>
				</div>
				<div className="login-bottom-option">
					Don&#39;t have a login?<a onClick={onSignup}>Create an account</a>
				</div>
			</div>
		</div>
	)
}
