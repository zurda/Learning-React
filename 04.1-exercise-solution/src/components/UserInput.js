import React from 'react';
import './UserInput.css';

const userInput = (props) => {
	return (
		<div>
			<input className='UserInput' type='text' onChange={props.changed} />
			<p>{props.inputLength}</p>
		</div>
	);
}

export default userInput;