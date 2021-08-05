import axios from 'axios'

import config from '../constants/config'
import { isValidText } from "../utils/helper";
import Storage from '../utils/storage'

const BASE_URL = config.API_BASE_URL

function handleResponse(response) {
	console.log(response)
	try {
		if (!response.data.error) { return response.data }
		const result = response.data.error.message
		if (isValidText(result, true)) {
			let message = result.replace('Error: ', '')
			if (message.includes("jwt malformed")) {
				message = "Your credentials were not registered in system."
			}
			if (message.includes("jwt expired")) {
				message = "Your credentials has been expired."
			}
			return { success: false, message: message }
		}
		const { msg, param } = response.data.error.errors[0]
		return { success: false, param: param, message: msg }
	} catch (error) {
		console.log(error)
	}
	return response.data
}

function parseError(error, placeholder = "Something went wrong") {
	if (error.isAxiosError) {
		return placeholder
	}

	if (error.message && error.message !== "") {
		return error.message
	}

	const { msg, param } = error.errors[0]
	return msg
}

function createConfiguration() {
	const accessToken = Storage.accessToken()
	if (!isValidText(accessToken)) { return axios.defaults }
	const headers = {
		...axios.defaults.headers,
		Authorization: `Bearer ${accessToken}`
	}
	return {
		...axios.defaults,
		headers: headers
	}
}

async function get(path, param = undefined) {
	let query = ''
	if (param) {
		query = '?'
		let keys = Object.keys(param)
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			query += `${key}=${param[key]}`
			if (i < keys.length - 1) {
				query += '&'
			}
		}
	}

	try {
		const requestPath = BASE_URL + path + query
		const response = await axios.get(requestPath, createConfiguration())
		return handleResponse(response)
	} catch (error) {
		console.log(error)
		const refreshToken = Storage.refreshToken()
		if (error.response && error.response.status === 401 && isValidText(refreshToken)) {
			const { success, data, message } = handleResponse(await axios.post(BASE_URL + '/refresh-access', { refreshToken: refreshToken }))
			if (success) {
				Storage.saveAccessToken(data.accessToken)
				return await get(path, param)
			}
		}

		throw error
	}
}

async function post(path, param = undefined) {
	try {
		const response = await axios.post(BASE_URL + path, param, createConfiguration())
		return handleResponse(response)
	} catch (error) {
		console.log(error)
		const refreshToken = Storage.refreshToken()
		if (error.response && error.response.status === 401 && isValidText(refreshToken)) {
			const { success, data, message } = handleResponse(await axios.post(BASE_URL + '/refresh-access', { refreshToken: refreshToken }))
			if (success) {
				Storage.saveAccessToken(data.accessToken)
				return await post(path, param)
			}
		}

		throw error
	}
}

const Api = { get, post, parseError }
export default Api

export function onSuccess(type, response = undefined) {
	return { type: type, response: response }
}

export function onFailure(type, error) {
	return { type: type, error: error }
}
