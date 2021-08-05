export function isMobile() {
	return window.innerWidth < 767
}

export function isSmallMobile() {
	return window.innerWidth < 576
}

export function isNumber(variable) {
	return Number.isFinite(variable)
}

export function isValidText(text, requiredTrim = false) {
	return (text && (requiredTrim ? (text.trim() !== "") : (text !== "")))
}

export function firstLetter(text) {
	if (!isValidText(text)) { return "" }
	return text.substr(0, 1).toUpperCase()
}

export function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export function isValidPassword(password) {
	const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\-/@#$%^&_+=()!,:;]).{6,}$/
	//	const regExp = /^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-:;<>.,]{8,}$/
	return regExp.test(password)
}

export function checkPasswordValidation(password1, password2) {
	let results = []
	if (!password1 || password1 === "" || !password2 || password2 === "") {
		results.push("Please fill passwords.")
	}

	if (!isValidPassword(password1)) {
		results.push("Password doesn't meet requirements.")
	}

	if (password1 !== password2) {
		results.push("Passwords do not match.")
	}

	return results
}

export function isValidPhoneNumber(phoneNumber) {
	if (!isValidText(phoneNumber, true)) { return false }
	const filteredPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
	return filteredPhoneNumber.length >= 10
}

export function phoneNumberAutoComplete(value, previousValue) {
	// return nothing if no value
	if (!value) return value;

	// only allows 0-9 inputs
	const currentValue = value.replace(/[^\d]/g, '');
	const cvLength = currentValue.length;

	if (!previousValue || value.length > previousValue.length) {

		// returns: "x", "xx", "xxx"
		if (cvLength < 4) return currentValue;

		// returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
		if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

		// returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
		return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
	}
}


export function randomUUID() {
	let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16)
	let result = [u.substr(0, 8), u.substr(8, 4), '4000-8' + u.substr(13, 3), u.substr(16, 12)].join('-')
	return result
}