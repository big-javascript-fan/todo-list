import React, { useEffect, useState } from 'react'

import './styles.scss'

import {TextField} from '../../components'
import iconChecked from '../../assets/images/checkbox1.svg'

import { isValidText, isValidEmail, checkPasswordValidation } from "../../utils/helper"
import Crypto from "../../utils/crypto"
import Api from "../../core/api"
import { useUser } from "../../core/models/user"

export default function SignUpScene(props) {

	const [email, setemail] = useState('')
	const [fullName, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [error, setError] = useState([])
	useEffect(() => { setError([]) }, [email, password, confirmPassword])

	const { isUserLoading, userApiError, currentUser, userRegister, userReset } = useUser()
	useEffect(() => {
		if (userApiError) {
			setError([userApiError])
			return
		}

		if (currentUser) {
			props.history.push("/dashboard")
		}
	}, [userApiError, currentUser])

	function onFinish() {
		Api.get("/email/check-used", { email: email })
			.then(response => {
				const { success, message } = response
				if (success) { return }
				else { setError([message]) }
			})
			.catch(error => {
				setError([Api.parseError(error, "Sorry, there is some trouble to check email is usable.")])
			})

		const passwordValidationError = checkPasswordValidation(password, confirmPassword)
		if (passwordValidationError.length > 0) {
			setError(passwordValidationError)
			return
		}

		const encryptedPassword1 = Crypto.encrypt(password)
		const encryptedPassword2 = Crypto.encrypt(confirmPassword)

		const payload = {
			fullName: fullName,
			email: email,
			password: encryptedPassword1,
			passwordConfirmation: encryptedPassword2
		}
		userRegister(payload)
	}

	function onLogin() {
		userReset()
		props.history.push('/login')
	}

	return (
		<div className="signup">
			<div className="signup-container">
				<div className="signup-container-title">Let's get started</div>
					{error.map((e, index) => {
						return (<div key={index} className="signup-container-error">{e}</div>)
					})}
					<div className="signup-container-form mt-48">
						<TextField id="email" className="pr-24" placeholder="Email address" autoFocus onChange={value => setemail(value)} value={email} />
					</div>
				
					<div className="signup-container-form mt-48">
						<TextField id="fullName" placeholder="Name" autoFocus onChange={value => setFullName(value.trim())} value={fullName} />
					</div>
					
					<div className="signup-container-form mt-48">
						<TextField id="password" autoFocus password placeholder="Password" value={password} error={error.length > 0} onChange={value => setPassword(value)} />
						<TextField className="signup-container-form-divider" id="confirmPassword" password placeholder="Confirm password" value={confirmPassword}
							error={error.length > 0} onChange={value => setConfirmPassword(value)} onNext={onFinish} />
					</div>
					
					<div className="signup-container-description mt-16">
						Passwords must have 6 characters, 1 uppercase character, 1 lowercase character, 1 number, 1 non-alphanumeric character.
					</div>
			</div>
			<div className="signup-bottom">
				<div className="signup-bottom-button">
					<button data-testid="button" type="button" disabled={!isValidEmail(email) || !isValidText(password) || !isValidText(fullName)} onClick={onFinish}>
						Submit
					</button>
				</div>
				<div className="signup-bottom-option">
					Already have a account?<a onClick={onLogin}>Sign in</a>
				</div>
			</div>
		</div>
	)
}
