import React from 'react';

const validationComponent = (props) => {
	let validationMessage;
	if (props.inputLength < 5) {
		validationMessage = 'Text is too short!';
	} else validationMessage = 'Text is long enough';
	return (
		<p>{validationMessage}</p>
	);
}

export default validationComponent;