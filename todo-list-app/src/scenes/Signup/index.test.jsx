import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import SignUpScene from "./index"
import { Provider } from 'react-redux'
import store from '../../core/store'
import {isValidPassword} from '../../utils/helper'


test('Signup: While personal email changed, next button and checkmark status are changed', async () => {
	const initialProps = {initialStep: 0}
	const {container} = render(
		<Provider store={store}>
			<SignUpScene {...initialProps} />
		</Provider>
	)

	expect(screen.getByTestId("button").disabled).toBe(true)
	expect(screen.getByTestId("checkmark").className).toContain("d-none")

	let personalEmail = ""
	fireEvent.change(screen.getByAltText(/personalEmail/), {target: {value: personalEmail}})
	expect(screen.getByTestId("button").disabled).toBe(true)
	expect(screen.getByTestId("checkmark").className).toContain("d-none")

	personalEmail = "a"
	fireEvent.change(screen.getByAltText(/personalEmail/), {target: {value: personalEmail}})
	expect(screen.getByTestId("button").disabled).toBe(true)
	expect(screen.getByTestId("checkmark").className).toContain("d-none")

	personalEmail = "a@a"
	fireEvent.change(screen.getByAltText(/personalEmail/), {target: {value: personalEmail}})
	expect(screen.getByTestId("button").disabled).toBe(true)
	expect(screen.getByTestId("checkmark").className).toContain("d-none")

	personalEmail = "a@a.com"
	fireEvent.change(screen.getByAltText(/personalEmail/), {target: {value: personalEmail}})
	expect(screen.getByTestId("button").disabled).toBe(false)
	expect(screen.getByTestId("checkmark").className).not.toContain("d-none")
})

test('Signup: While changing first and last name, next button state is changed', async () => {
	const initialProps = {initialStep: 1}
	const {container} = render(
		<Provider store={store}>
			<SignUpScene {...initialProps} />
		</Provider>
	)

	expect(screen.getByTestId("button").disabled).toBe(true)

	let firstName = "", lastName = ""
	fireEvent.change(screen.getByTestId("firstName"), {target: { value: firstName }})
	fireEvent.change(screen.getByTestId("lastName"), {target: { value: lastName }})
	expect(screen.getByTestId("button").disabled).toBe(true)

	firstName = "a", lastName = ""
	fireEvent.change(screen.getByTestId("firstName"), {target: { value: firstName }})
	fireEvent.change(screen.getByTestId("lastName"), {target: { value: lastName }})
	expect(screen.getByTestId("button").disabled).toBe(true)

	firstName = "a", lastName = "a"
	fireEvent.change(screen.getByTestId("firstName"), {target: { value: firstName }})
	fireEvent.change(screen.getByTestId("lastName"), {target: { value: lastName }})
	expect(screen.getByTestId("button").disabled).toBe(false)
})


test('Signup: Password Validation', async () => {
	let password = "Abcdef123!"
	expect(isValidPassword(password)).toBe(true)

	password = "Abc12345!"
	expect(isValidPassword(password)).toBe(true)

	password = "Abc123!"
	expect(isValidPassword(password)).toBe(true)

	password = "Abcdef1!"
	expect(isValidPassword(password)).toBe(true)

	password = "Abcdef!1"
	expect(isValidPassword(password)).toBe(true)

	password = "!123Abc"
	expect(isValidPassword(password)).toBe(true)
})