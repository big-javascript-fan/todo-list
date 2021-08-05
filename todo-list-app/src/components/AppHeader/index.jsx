import React, { useState } from "react"
import { NavLink } from 'react-router-dom'

import './styles.scss'

import iconLogo from "../../assets/images/logo.svg";
import iconHamburger from "../../assets/images/hamburger.svg";
import { isValidText } from "../../utils/helper";

export function AppHeader(props) {
	const { children, onMenu } = props

	function handleOnMenu(event) {
		event.preventDefault()
		event.stopPropagation()

		if (onMenu) {
			onMenu()
		}
	}

	return (
		<div id="app-header" className="app-header">
			<div className="app-header-content">
				<img src={iconLogo} alt="test" />
				{children}
				<div className="app-header-content-hamburger" onClick={handleOnMenu}>
					<img src={iconHamburger} alt="Menu" />
				</div>
			</div>
		</div>
	)
}

export function AppHeaderRightContainer(props) {
	const { children } = props

	return (
		<div className="app-header-content-right">
			{children}
		</div>
	)
}

export function AppHeaderRightItem(props) {
	const { title, url, leftIcon, rightIcon, onClick } = props

	function handleClick(event) {
		if (event) {
			event.preventDefault()
			event.stopPropagation()
		}
		if (onClick) { onClick() }
	}

	return (
		<div className="app-header-item" onClick={handleClick}>
			{!isValidText(url, true) &&
				<>
					{leftIcon && <img src={leftIcon} alt="" />}
					{title}
					{rightIcon && <img src={rightIcon} alt="" />}
				</>
			}
			{isValidText(url, true) &&
				<NavLink to={url}>
					{leftIcon && <img src={leftIcon} alt="" />}
					{title}
					{rightIcon && <img src={rightIcon} alt="" />}
				</NavLink>
			}
		</div>
	)
}
