import React, { Component } from 'react';
import UserInput from './components/UserInput';
import ValidationComponent from './components/ValidationComponent';
import CharComponent from './components/CharComponent';
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
		console.log(charIndex);
		textArray.splice(charIndex, 1);
		this.setState({text: textArray.join('')});

	}

  render() {
  	const textArray = this.state.text.split('');
  	let splitMessage = null;
  	splitMessage = 
  		<div>
  			{textArray.map((char, index) => {
  				return <CharComponent myChar={char} 
  								click={() => this.deleteCharHandler(index)} />
  			})}

  		</div>
    return (
      <div className="App">
	      <UserInput changed={this.changeInputHandler} inputLength={this.state.length} />
	      <ValidationComponent inputLength={this.state.length} />
	      {splitMessage}
      </div>
    );
  }
}

export default App;
