import React, { Component } from 'react';
import Validation from './components/Validation';
import Char from './components/Char';
import './App.css';

class App extends Component {
	state = {
		length: 0,
		text: ''
	}

	changeInputHandler = (event) => {
		const newLength = event.target.value.length;
		this.setState({length: newLength});
		this.setState({text: event.target.value})
	}

	deleteCharHandler = (charIndex) => {
		// creates an array and copies it
		const textArray = this.state.text.split('').slice();
		textArray.splice(charIndex, 1);
		this.setState({text: textArray.join('')});
	}

  render() {
  	const textArray = this.state.text.split('');
  	let splitMessage = null;
  	splitMessage = 
  		<div>
  			{textArray.map((char, index) => {
  				return <Char myChar={char} key={index}
  								click={() => this.deleteCharHandler(index)} />
  			})}

  		</div>
    return (
      <div className="App">
      	<input className='UserInput' type='text' onChange={this.changeInputHandler} value={this.state.text} placeholder='Enter some text' />
      	<p>Original text length: {this.state.length}</p>
	      <Validation inputLength={this.state.length} />
	      {splitMessage}
      </div>
    );
  }
}

export default App;
