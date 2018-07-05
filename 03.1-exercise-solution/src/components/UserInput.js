import React from 'react';
import './UserInput.css';

const userInput = (props) => { 
	const style = {
		border: '1px solid #eee',
 		boxShadow: '0 2px 3px #ccc'
	}
	return (
		<div className='UserInput'>
			<label for='UserName' >Change Me:</label>
			<input style={style} id='UserName' onChange={props.changed} value={props.currentName} />
		</div>
	);
} 

export default userInput;