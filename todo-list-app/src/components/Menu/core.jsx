import React from 'react'

import { randomUUID } from '../../utils/helper'

export class MenuOption {
	label = ''
	info = null
	selected = false
	subOptions = undefined
	onClick = () => { }

	constructor(props) {
		const { label, selected, info, subOptions, onClick } = props

		this.label = label || this.label
		this.info = info || this.info
		this.selected = selected || false
		this.subOptions = subOptions || this.subOptions
		this.onClick = onClick || this.onClick
	}
}

export class Menu extends React.Component {
	menuRef = React.createRef()
	menuId = undefined
	static openedComponents = []

	constructor(props) {
		super(props)

		this.menuId = this.props.id || randomUUID()
	}

	handleWindowClicked = (event) => { }

	open = () => { this.handleOpen() }
	close = () => { this.handleClose() }
	toggle = () => {
		if (this.state && this.state.isOpen)
			this.close()
		else
			this.open()
	}

	handleOpen = () => {
		this.setState({ isOpen: true })
		Menu.openedComponents.forEach((e) => {
			if (e !== this) {
				e.handleClose()
			}
		})
		Menu.openedComponents.push(this)
		window.addEventListener('click', this.handleWindowClicked, false)
	}

	/// Whenever update, copy inner proc to Hemu->handleClose()
	handleClose = () => {
		this.setState({ isOpen: false })
		Menu.openedComponents.pop(this)
		window.removeEventListener('click', this.handleWindowClicked, false)
		if (this.props.onClose) { this.props.onClose() }
	}
}