import React from 'react';
import classes from './Person.css';

const person = (props) => {
	return (
		<div className={classes.Person} >
			<p onClick={props.click}>I am {props.name} and I am {props.age} year old! I live in {props.location}!</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} />
		</div>
	);
}

export default person;