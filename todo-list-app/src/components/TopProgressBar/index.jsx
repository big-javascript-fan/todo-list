import React, {useEffect} from 'react'

import './styles.scss'

export default function TopProgressBar(props) {
	const ref = React.createRef()
	const {progress, isHidden} = props

	useEffect(() => { update() }, [])

	function update() {
		if (!ref.current) { return }
		if (isHidden) {
			ref.current.style.display = 'none'
			return
		}

		ref.current.style.width = `${progress || 100}%`
	}

	return (
		<div className="top-progress-bar" ref={ref}/>
	)
}
