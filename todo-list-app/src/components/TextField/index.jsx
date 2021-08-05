import React from 'react';
import useEmailAutocomplete from "../../utils/autoComplete"

import './styles.scss';

export function TextField(props) {
	const {
		className,
		id,
		name,
		placeholder, value,
		onChange, onNext,
		autoFocus, required, password, error,
		autoComplete, domains,
		buttonStyle, buttonTitle, onButtonClicked, isButtonShown} = props

	const {email, onChange: handleEmailChange, bind} = useEmailAutocomplete({domains: domains, validation: false})

	function onValueChanged(event) {
		event.preventDefault()

		if (autoComplete) {
			handleEmailChange(event)
			onChange(email.address)
			return
		}
		onChange(event.target.value.trim())
	}

	function onKeyDown(event) {
		if (event.key === 'Enter' && onNext) {
			onNext()
		}
	}

	function onInnerButtonClicked() {
		if (onButtonClicked) {
			onButtonClicked()
		}
	}

	return (
		<div className={`text-field-container field ${className || ""}`}>
			<input {...bind} id={id || "input"} data-testid={id} type={password ? "password" : "text"}
				   className={`text-field-input ${password && 'text-field-password'} ${error && 'text-field-error'}`}
				   placeholder="Placeholder" alt={id}
				   value={value || ""} autoFocus={autoFocus} required={required} autoComplete="off" onChange={onValueChanged} onKeyDown={onKeyDown} />
			<label htmlFor={id || "input"} className={`text-field-label ${error && 'text-field-error'}`}>{placeholder}</label>
			{(buttonTitle && isButtonShown) &&
			<button className="text-field-button" onClick={onInnerButtonClicked}>{buttonTitle}</button>
			}
		</div>
	);
};
