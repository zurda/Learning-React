import React from 'react';
import './Char.css';

const char = (props) => {
	return <p className="Char" onClick={props.click} >{props.myChar}</p>;
}

export default char;