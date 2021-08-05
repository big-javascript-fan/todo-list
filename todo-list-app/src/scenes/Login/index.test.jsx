import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import LoginScene from "./index"
import { Provider } from 'react-redux';
import store from '../../core/store'

test('Login: When email or password changed, login button style is changed', async () => {
	const {container} = render(<Provider store={store}><LoginScene /></Provider>)

	let email = "", password = ""
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(true)

	email = "a"
	password = ""
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(true)

	email = ""
	password = "a"
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(true)

	email = "a@a"
	password = "a"
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(false)

	email = "a@a.com"
	password = "abcdefgh"
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(false)

	email = "a@locrmail.com"
	password = "Abcdef1!"
	fireEvent.change(screen.getByAltText(/emailInput/), {target: {value: email}})
	fireEvent.change(screen.getByAltText(/passwordInput/), {target: {value: password}})
	expect(screen.getByText(/Log in/).disabled).toBe(false)
})
