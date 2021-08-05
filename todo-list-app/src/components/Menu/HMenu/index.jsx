import React from 'react'

import './styles.scss'

import { Menu } from '../'
import arrowNext from '../../../assets/images/arrow-next-white.svg'

export default class HMenu extends Menu {
	constructor(props) {
		super(props)

		const { isOpen } = this.props
		this.state = {
			isOpen: isOpen || false,
			options: this.props.options.map(option => ({ ...option, isChildOpen: false }))
		}
	}

	handleWindowClicked = (event) => {
		if (!event.target.closest(".h-menu-parent")) {
			this.handleSubOptionClose()
		}
	}

	handleClose = () => {
		this.setState({
			options: this.props.options.map((e, i) => ({ ...e, isChildOpen: false }))
		})
		this.setState({ isOpen: false })
		Menu.openedComponents.pop(this)
		window.removeEventListener('click', this.handleWindowClicked, false)
		if (this.props.onClose) { this.props.onClose() }
	}

	handleOptionClicked = (option, index) => {
		this.setState({
			options: this.props.options.map((e, i) => ({ ...e, isChildOpen: i === index }))
		})

		if (!option.subOptions) {
			option.onClick()
			this.handleClose()
		}
	}

	handleSubOptionClose = () => {
		this.handleClose()
	}

	renderOption = (option) => {
		return (
			<>
				<div>{option.label}</div>
				{option.subOptions &&
					<img src={arrowNext} alt="" />
				}
				{(option.subOptions && option.isChildOpen) &&
					<HMenu isOpen={true} options={option.subOptions} onClose={this.handleSubOptionClose} />
				}
			</>
		)
	}

	render() {
		const { isOpen, options } = this.state
		return (
			<>
				{isOpen &&
					<div id={this.menuId} ref={this.menuRef} className="h-menu">
						{options &&
							options.map((option, index) => (
								<div
									key={index}
									className={`h-menu-item ${option.subOptions ? 'h-menu-parent' : ''}`}
									onClick={event => {
										event.preventDefault()
										event.stopPropagation()
										this.handleOptionClicked(option, index)
									}}>
									{this.renderOption(option)}
								</div>
							))}
					</div>
				}
			</>
		)
	}
}