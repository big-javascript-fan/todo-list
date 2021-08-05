import React, { useState, useEffect } from 'react'

import './styles.scss'

import iconArrowDown from '../../assets/images/arrow_down.svg'
import iconArrowBackGray from '../../assets/images/arrow_back_gray.svg'
import iconArrowNextGray from '../../assets/images/arrow_next_gray.svg'
import iconCheckboxUnchecked from '../../assets/images/checkbox-gray-0.svg'
import iconCheckboxChecked from '../../assets/images/checkbox-green-1.svg'

import iconCheckmarkGray from '../../assets/images/checkmark/gray-16.svg'
import iconCheckmarkGreen from '../../assets/images/checkmark/green-16.svg'
import iconCrossGray from '../../assets/images/cross/gray-16.svg'
import iconCrossGreen from '../../assets/images/cross/green-16.svg'

import {Checkbox} from '../'
import { MenuOption, DropDownMenu } from "../Menu"
import { isMobile, isSmallMobile, isNumber } from "../../utils/helper"

export function Table(props) {

	const { className, children } = props

	return (
		<div className={`table ${className}`}>
			{children}
		</div>
	)
}

export function TableHeader(props) {
	const {
		className, searchKey = '', viewOptions, children, onSelectAll, onSearch,
		onBulkAllow, onBulkBlock
	} = props

	const [isSelectAll, setIsSelectAll] = useState(false)
	useEffect(() => {
		if (onSelectAll) { onSelectAll(isSelectAll) }
	}, [isSelectAll])

	const [isBlukActive, setIsBulkActive] = useState(false)

	function handleSearchKeyChanged(value) {
		if (onSearch) {
			onSearch(value)
		}
	}

	return (
		<>
			<div className={`table-header ${className ? className : ""}`}>
				<div>
					<div className="table-header-normal">
						<Checkbox
							id="selectAll"
							iconChecked={iconCheckboxChecked}
							iconUnchecked={iconCheckboxUnchecked}
							checked={isSelectAll}
							onChange={value => setIsSelectAll(value)}
						/>
						<img
							src={iconArrowDown}
							alt=""
							onClick={event => {
								event.preventDefault()
								setIsBulkActive(!isBlukActive)
							}} />
					</div>
					<div
						className={`table-header-bulk ${!isBlukActive && 'd-none'}`}
						onClick={event => { setIsBulkActive(false) }}>
						<div className="table-header-bulk-item" onClick={event => { if (onBulkAllow) onBulkAllow() }}>
							<img src={iconCheckmarkGray} alt="" />
							<img src={iconCheckmarkGreen} alt="" />
						</div>
						<div className="table-header-bulk-item" onClick={event => { if (onBulkBlock) onBulkBlock() }}>
							<img src={iconCrossGray} alt="" />
							<img src={iconCrossGreen} alt="" />
						</div>
					</div>
				</div>
				<div>
					<DropDownMenu options={viewOptions} label={isSmallMobile() ? 'View' : 'View Options'} />
				</div>
			</div>
			{children}
		</>
	)
}


export function TableCell(props) {
	const { className, children } = props
	return (
		<div className={`table-cell ${className}`}>
			{children}
		</div>
	)
}

export class TablePagination extends React.Component {
	constructor(props) {
		super(props)
	}

	pageIndex = () => {
		return this.props.pageIndex || 0
	}

	pageCount = () => {
		const { count = 50, pageSize = 5 } = this.props
		return Math.round(parseFloat(count) / parseFloat(pageSize) + 0.5)
	}

	configurePageIndexes = () => {
		const pageCount = this.pageCount()
		const result = []
		for (let i = 0; i < pageCount; i++) {
			result.push(i)
		}
		return result
	}

	handlePageSize = (pageSize) => {
		this.handlePageIndex(0)
		this.props.onPageSize(pageSize)
	}

	handlePageIndex = (index) => {
		this.props.onPageIndex(index)
	}

	handlePrev = (event) => {
		if (event) {
			event.preventDefault()
			event.stopPropagation()
		}

		this.handlePageIndex(Math.max(0, this.pageIndex() - 1))
	}

	handleNext = (event) => {
		if (event) {
			event.preventDefault()
			event.stopPropagation()
		}

		this.handlePageIndex(Math.min(this.pageCount() - 1, this.pageIndex() + 1))
	}

	render() {
		const { className, pageSize } = this.props
		const pageSizes = [5, 10, 25, 50, 100]
		const pageSizeIndex = pageSizes.indexOf(pageSize)
		const pageOptions = pageSizes.map((e, i) => {
			return new MenuOption({
				label: `${e} per page`,
				selected: (pageSize === e),
				onClick: () => this.handlePageSize(e)
			})
		})

		return (
			<div className={`${className ? className : ""} table-pagination`}>
				<DropDownMenu
					id="pagination"
					up
					options={pageOptions}
					index={pageSizeIndex}
				/>
				<div className="table-pagination-page">
					<div
						className="table-pagination-page-item"
						onClick={this.handlePrev}>
						<img src={iconArrowBackGray} alt="" />
					</div>
					{this.configurePageIndexes().map((e, index) => {
						return (
							<div key={index}>
								{isNumber(e) &&
									<div
										className={`table-pagination-page-item ${this.pageIndex() === e ? 'table-pagination-page-selected' : ''}`}
										onClick={() => this.handlePageIndex(index)}>
										{e + 1}
									</div>
								}
								{!isNumber(e) &&
									<div className={`table-pagination-page-item ${this.pageIndex() === e ? 'table-pagination-page-selected' : ''}`}>{e + 1}</div>
								}
							</div>
						)
					})}
					<div
						className="table-pagination-page-item"
						onClick={this.handleNext}>
						<img src={iconArrowNextGray} alt="" />
					</div>
				</div>
			</div>
		)
	}
}
