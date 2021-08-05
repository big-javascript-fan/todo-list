import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import './styles.scss'

import { isValidText } from '../../utils/helper'

export class AppMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isOpen: false }
	}

	open = (isOpen) => {
		window.removeEventListener('click', this.handleClickWindow, false)
		if (isOpen) {
			window.addEventListener('click', this.handleClickWindow, false)
		} else {
			if (this.props.onClose) { this.props.onClose() }
		}
		this.setState({ isOpen: isOpen })
	}

	handleClick = (event) => {
		if (event) {
			event.preventDefault()
			event.stopPropagation()
		}

		this.open(false)
	}

	handleClickWindow = (event) => {
		if (!event.target.matches('#app-menu')) {
			this.open(false)
		}
	}

	render() {
		const { children } = this.props
		const { isOpen } = this.state

		return (
			<div className={`app-menu ${isOpen ? '' : 'hidden'}`} onClick={this.handleClick}>
				<div className="app-menu-wrapper">
					<div id="app-menu" className="app-menu-content">
						{children}
					</div>
				</div>
			</div>
		)
	}
}

export function AppMenuItem(props) {
	const { title, url, leftIcon, rightIcon, onClick } = props

	function handleClick(event) {
		event.stopPropagation()
		if (onClick) {
			onClick()
		}
	}

	return (
		<div className="app-menu-item" onClick={handleClick}>
			{!isValidText(url) && title}
			{isValidText(url) &&
				<NavLink to={url}>
					{title}
				</NavLink>
			}
		</div>
	)
}
