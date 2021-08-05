import React, { useEffect, useState } from 'react'

import './styles.scss'
import iconDefaultUnchecked from '../../assets/images/checkbox0.svg'
import iconDefaultChecked from '../../assets/images/checkbox1.svg'

import { isValidText } from "../../utils/helper"

export class Checkbox extends React.Component {
	constructor(props) {
		super(props)

		const { checked } = this.props
		
		this.state = {
			checked,
		}
	}

	handleClick = (event) => {
		event.preventDefault()

		const { checked } = this.state
		if (this.props.onChange) {
			this.props.onChange(!checked)
		}

		this.setState({ checked: !checked })
	}

	render() {
		const { className, id, label, iconChecked = iconDefaultChecked, iconUnchecked = iconDefaultUnchecked, checked } = this.props

		return (
			<label className={`checkbox-container ${className}`} onClick={this.handleClick} data-testid={id || "label"}>
				<img src={iconChecked} className={`${checked ? '' : 'd-none'}`} alt="Checked" data-testid="checked" />
				<img src={iconUnchecked} className={`${checked ? 'd-none' : ''}`} alt="Unchecked" data-testid="unchecked" />
				{isValidText(label) && <div className="checkbox-label ml-16">{label}</div>}
			</label>
		)
	}
}
