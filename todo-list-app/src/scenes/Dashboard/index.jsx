import React, { useState, useEffect } from 'react'

import './styles.scss'
import iconAccount from '../../assets/images/icon_account.svg'
import iconArrowDown from '../../assets/images/arrow_down.svg'
import iconRemove from '../../assets/images/close.svg'
import iconCheckboxUnchecked from '../../assets/images/checkbox-gray-0.svg'
import iconCheckboxChecked from '../../assets/images/checkbox-green-1.svg'

import { 
	AppHeader,
	AppHeaderRightContainer,
	AppHeaderRightItem,
	AppMenu,
	AppMenuItem,
	Table,
	TableCell,
	TableHeader,
	TablePagination,
	Modal
} from '../../components'
import { isMobile, isValidText } from '../../utils/helper'
import { Storage } from '../../utils'
import { useUser } from "../../core/models/user"
import { Sender, Todo } from "../../core";

export default function DashboardScene(props) {
	const { isUserLoading, userApiError, currentUser, userGetProfile, userReset } = useUser()
	useEffect(() => {
		if (!isValidText(Storage.accessToken()) && props.history) {
			props.history.push("/login")
		}
	}, [])

	useEffect(() => {
		if (isValidText(userApiError) && props.history) {
			userReset()
			props.history.push("/login")
		}
	}, [userApiError])

	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const appMenuRef = React.createRef()
	useEffect(() => {
		if (appMenuRef.current) { appMenuRef.current.open(isOpenMenu) }
	}, [isOpenMenu])

	useEffect(() => {
		if (!currentUser) {
			loadTodos()
		}
	}, [])

	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState("")
	const [modalTodo, setModalTodo] = useState(null)

	async function loadTodos() {
		const {results} = await Todo.getAll()
		setTodos(results)
	}

	async function addTodo() {
		const {error} = await Todo.add({title})
		loadTodos()
	}

	async function removeTodo(id) {
		const {error} = await Todo.remove(id)
		loadTodos()
	}

	function onLogout() {
		userReset()
		if (props.history) { props.history.push("/login") }
	}

	function handleAdd () {
		addTodo()
		setTitle('');
	}

	function SubListItem({value}) {
		const {id, title } = value

		return (
			<>
				<TableCell className="dashboard-table-cell dashboard-table-sub-cell">
					<div onClick={() => setModalTodo(value)}>
						<div className="title">{title}</div>
					</div>
					<div>
						<img className="icon-remove" src={iconRemove} alt="remove item" onClick={() => removeTodo(id)}/>
					</div>
				</TableCell>
			</>
		)
	}

	return (
		<div id="parent" className={`page-container ${(isMobile() && isOpenMenu) ? 'no-scroll' : ''}`}>
			<AppHeader onMenu={() => setIsOpenMenu(!isOpenMenu)}>
				<AppHeaderRightContainer>
					<AppHeaderRightItem
						title={`Hi, ${(currentUser && currentUser.firstName) ? currentUser.firstName : ''}`}
						leftIcon={iconAccount} rightIcon={iconArrowDown}
						onClick={() => setIsOpenMenu(!isOpenMenu)} />
				</AppHeaderRightContainer>
			</AppHeader>
			<AppMenu ref={appMenuRef} onClose={() => setIsOpenMenu(false)}>
				{isMobile() ?
					<>
						<AppMenuItem title="Logout" onClick={onLogout} />
					</>
					:
					<>
						<AppMenuItem title="Logout" onClick={onLogout} />
					</>
				}
			</AppMenu>
			<div className="dashboard">
				<div className="dashboard-wrapper">
					<div className="dashboard-content">
						<div className="dashboard-content-left">
							<input type="text" className="add-input" value={title} placeholder="Please add todo" onChange={(event) => setTitle(event.target.value)}/>
							<button type="button" className="btn-primary" onClick={handleAdd}>Add</button>
						</div>
						<div className="dashboard-table">
							{todos.map((todo, index) => 
								<SubListItem
									key={index}
									value={todo}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			{modalTodo &&
				<Modal value={modalTodo} onClose={() => setModalTodo(null)} onUpdate={() => loadTodos()}/>
			}
		</div>
	)
}