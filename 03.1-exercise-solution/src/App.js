import React, { Component } from 'react';
import UserOutput from './components/UserOutput';
import UserInput from './components/UserInput';
import './App.css';

class App extends Component {
	state = {
		ueserNames: [
			{name: 'Elsa', placeholder: 'Elsa' },
			{name: 'Anna', placeholder: 'Anna'},
			{name: 'Olaf', placeholder: 'Olaf'}
		]
	}

	nameChangeHandler = (event) => {
		this.setState( {
		ueserNames: [
			{name: event.target.value, placeholder: 'Elsa' },
			{name: 'Anna', placeholder: 'Anna'},
			{name: 'Olaf', placeholder: 'Olaf'}
		]
	});
	}

  render() {
    return (
      <div className="App">
      	<UserInput changed={this.nameChangeHandler} currentName={this.state.ueserNames[0].name} />
        <UserOutput username={this.state.ueserNames[0].name} />
        <UserOutput username={this.state.ueserNames[1].name} />
        <UserOutput username={this.state.ueserNames[2].name} />
      </div>
    );
  }
}

export default App;
