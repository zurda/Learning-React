import React from 'react';

const validation = (props) => {
	let validationMessage;
	if (props.inputLength < 5) {
		validationMessage = 'Text is too short!';
	} else validationMessage = 'Click on a charachter to delete it';
	return (
		<p>{validationMessage}</p>
	);
}

export default validation;