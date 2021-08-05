import React, {useState, useEffect} from 'react'

import './styles.scss'

import iconArrowDown from '../../assets/images/arrow_down.svg'
import iconChecked from '../../assets/images/checked_no_outline.svg'

import {isValidText} from "../../utils/helper"

export default function DropDown(props) {

	const {placeholder, up, values, onSelect} = props

	const [index, setIndex] = useState(isValidText(placeholder) ? -1 : 0)
	useEffect(() => {
		if (onSelect) { onSelect(index) }
	}, [index])
	const [isListOpen, setIsListOpen] = useState(false)
	useEffect(() => {
		if (isListOpen) {
			window.addEventListener('click', handleClickWindow, false)
		} else {
			window.removeEventListener('click', handleClickWindow, false)
		}
	}, [isListOpen])

	function currentValue() {
		if (index < 0 && isValidText(placeholder)) { return placeholder }
		if (values && values.length > index) { return values[index] }
		return ""
	}

	function handleClickBox(event) {
		event.preventDefault()
		event.stopPropagation()

		setIsListOpen(!isListOpen)
	}

	function handleClickWindow(event) {
		if (!event.target.matches('.dropdown')) {
			setIsListOpen(false)
		}
	}

	return (
		<div className="dropdown">
			<div className="dropdown-box" onClick={handleClickBox}>
				<div className="dropdown-box-value">{currentValue()}</div>
				<img src={iconArrowDown} alt="" />
			</div>
			{(isListOpen && values) &&
				<div className={`dropdown-list ${up ? 'up' : 'down'}`} onClick={() => setIsListOpen(false)}>
					{values.map((value, i) => (
						<DropDownItem key={i} value={value} selected={index === i} onSelect={() => setIndex(i)}/>
					))}
				</div>
			}
		</div>
	)
}

function DropDownItem(props) {
	const {value, selected, onSelect} = props

	function handleClick(event) {
		event.preventDefault()
		if (onSelect) {
			onSelect()
		}
	}

	return (
		<div className="dropdown-list-item" onClick={handleClick}>
			<img className={selected ? "" : "d-hidden"} src={iconChecked} alt=""/>
			<div>{value}</div>
		</div>
	)
}
