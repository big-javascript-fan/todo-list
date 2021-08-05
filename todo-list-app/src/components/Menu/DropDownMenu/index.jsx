import React from 'react'

import './styles.scss'

import { Menu } from '../'
import iconArrowDown from '../../../assets/images/arrow_down.svg'
import iconChecked from './images/checked-green-no-outline.svg'

import { isMobile, isValidText } from "../../../utils/helper"

export default class DropDownMenu extends Menu {

	constructor(props) {
		super(props)

		const { index, subIndex } = this.props
		console.log(index)
		this.state = {
			index: index || 0,
			subIndex: subIndex || 0,
		}
	}

	setIndex = (index) => {
		this.setState({ index: index })
		this.handleClose()
	}

	setSubIndex = (index) => {
		this.setState({ subIndex: index })
		this.handleClose()
	}

	option = (index) => {
		const { options } = this.props
		if (!options) { return undefined }
		return options[index]
	}

	subOption = (index) => {
		const option = this.option(this.state.index)
		return (option && option.subOptions) ? option.subOptions[index] : undefined
	}

	handleOptionClick = (option) => {
		if (!option) { return }
		if (option.subOptions && option.subOptions.length > 0) {
			this.setSubIndex(0)
		} else {
			option.onClick()
		}

		this.handleClose()
	}

	label = () => {
		const { label = "", options } = this.props
		if (isValidText(label) || this.state.index < 0) { return label }

		const selectedOptions = options.filter(e => e.selected)
		if (selectedOptions.length <= 0) { return '' }
		return selectedOptions[0].label
	}

	handleWindowClicked = (event) => {
		if (!event.target.closest(".dropdown")) {
			this.handleClose()
		}
	}

	handleClickBox = (event) => {
		event.preventDefault()
		event.stopPropagation()
		this.toggle()
	}

	render() {
		const { className, up, options } = this.props
		const { index: optionIndex, subIndex: subOptionIndex, isOpen } = this.state
		return (
			<div className={`dropdown ${className && className}`} >
				<div className="dropdown-box" onClick={this.handleClickBox}>
					<div className="dropdown-box-value">{this.label()}</div>
					<img src={iconArrowDown} alt="" />
				</div>
				{(isOpen && options) &&
					<div
						id={this.menuId}
						ref={this.menuRef}
						className={`dropdown-overlay ${up ? 'up' : 'down'}`}
						onClick={event => { this.handleClose() }}>
						<div
							className="dropdown-list"
							onClick={() => this.handleClose()}>
							{options.map((option, i) => (
								<DropDownMenuItem
									key={i}
									option={option}
									subOptionIndex={optionIndex === i ? subOptionIndex : undefined}
									onClick={() => {
										this.setIndex(i)
										if (!option.subOptions && option.onClick) {
											option.onClick()
										}
									}}
									onSubOptionClick={(index) => {
										this.setIndex(i)
										this.setSubIndex(index)
									}}
								/>
							))}
						</div>
					</div>
				}
			</div>
		)
	}
}

class DropDownMenuItem extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClick = (event) => {
		event.preventDefault()
		event.stopPropagation()

		if (this.props.onClick) {
			this.props.onClick()
		}
	}

	handleSubOptionClick = (index) => {
		if (this.props.onSubOptionClick) {
			this.props.onSubOptionClick(index)
		}
	}

	render() {
		const { className, option, subOptionIndex, onClick, onSubOptionClick } = this.props
		return (
			<>
				<div
					className={`dropdown-list-item ${className ? className : ''} ${option.selected ? 'active' : ''}`}
					onClick={this.handleClick}>
					<img
						className={`${option.subOptions ? 'd-none' : ''} ${option.selected ? "" : "d-hidden"}`}
						src={iconChecked}
						alt="" />
					<div>{option.label}</div>
				</div>
				{option.subOptions &&
					option.subOptions.map((e, i) => (
						<DropDownMenuItem
							key={i}
							option={e}
							onClick={() => {
								this.handleSubOptionClick(i)
								if (e.onClick) { e.onClick() }
							}}
						/>
					))
				}
			</>
		)
	}
}