import React from 'react'

import './styles.scss'

import iconClose from '../../assets/images/onboard_close.svg'
import {isMobile, isValidText, phoneNumberAutoComplete} from "../../utils/helper";
import iconClear from "../../assets/images/close_gray.svg";

export function Alert(props) {
	const {onCancel, children, step = 0} = props

	function handleClick(event) {
		event.preventDefault()
		if (onCancel) {
			onCancel()
		}
	}

	function pages() {
		/*const results = []
		React.Children.forEach(children, (child) => {
			if (child.type.name === "AlertPage") {
				results.push(child)
			}
		})
		return results[step]*/
		return children[step]
	}

	function handleCancel(event) {
		event.preventDefault()
		event.stopPropagation()

		if (onCancel) { onCancel() }
	}

	return (
		<div className="alert" onClick={handleClick}>
			<div className="alert-container">
				<div className="alert-content" onClick={(event) => event.stopPropagation()}>
					{pages()}
					<div className="alert-close" onClick={handleCancel}>
						<img src={iconClose} alt="Close"/>
					</div>
				</div>
			</div>
		</div>
	)
}

export function AlertPage(props) {
	const {children, onCancel} = props

	function title() {
		const results = []
		React.Children.forEach(children, (child) => {
			if (child.type.name === "AlertTitle") {
				results.push(child)
			}
		})
		return results
	}

	function buttons() {
		const results = []
		React.Children.forEach(children, (child) => {
			if (child.type.name === "AlertButton") {
				results.push(child)
			}
		})
		return results
	}

	function message() {
		const results = []
		React.Children.forEach(children, (child) => {
			if (child.type.name === "AlertMessage") {
				results.push(child)
			}
		})
		return results
	}

	return (
		<>
			{children}
		</>
	)
}

export function AlertTitle(props) {
	const {value} = props
	return (
		<div className="alert-title">{value}</div>
	)
}

export function AlertMessage(props) {
	const {value} = props

	return (
		<div className="alert-message">{value}</div>
	)
}

export function AlertButtonContainer(props) {
	const {children} = props

	return (
		<div className="alert-button">
			{children}
		</div>
	)
}

export function AlertButton(props) {
	const {title, type = "positive", disabled, onClick} = props

	function handleClick(e) {
		e.preventDefault()
		if (onClick) {
			onClick()
		}
	}

	return (
		<button className={`alert-button-${type}`} disabled={disabled} onClick={handleClick}>
			{title}
		</button>
	)
}

export function AlertInput(props) {
	const {placeholder, id, value, error, onChange} = props

	function handleChange(event) {
		event.preventDefault()
		if (!onChange) { return }

		onChange(event.target.value.trim())
	}

	return (
		<>
			<div className="alert-input">
				<input id={id} data-testid={id} placeholder={placeholder} type="text" value={value || ""} onChange={handleChange}/>
			</div>
			{isValidText(error, true) && <label htmlFor={id}>{error}</label>}
		</>
	)
}
