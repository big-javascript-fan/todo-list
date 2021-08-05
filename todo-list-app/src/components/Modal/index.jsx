import React from 'react'

import './styles.scss'
import iconTrianglePrev from '../../assets/images/triangle/prev.svg'

import {Todo} from '../../core'

export function Modal({
	containerStyle = '',
	value={},
	onUpdate = () => {},
	onClose = () => {}
}) {
	const [id, setId] = React.useState(null)
	const [title, setTitle] = React.useState(null)
	React.useEffect(() => {
		if (value) {
			setId(value.id)
			setTitle(value.title)
		}
	}, [value])

	function handleClose() {
		onClose()
	}

	async function handleUpdate() {
		const {error} = await Todo.update(id, title)
		onUpdate()
		onClose()
	}
	
	return (
		<div className={`modal-container ${containerStyle}`}>
			<div className={`modal`}>
				<div className="modal-title">Please change...</div>
				<textarea type="text" placeholder="Change Todo list" rows="5" className="modal-edit" value={title} onChange={(event) => setTitle(event.target.value)}/>
				<div className="modal-button-container">
					<button onClick={handleUpdate}>Update</button>
					<button onClick={handleClose}>Close</button>
				</div>
				<img className="modal-triangle" src={iconTrianglePrev} alt="" />
			</div>
		</div>
	)
}