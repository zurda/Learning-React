import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ id: 'fewlrm', name: 'Elsa', age: 18, location: 'Arendelle' }, 
			{ id: 'dfgs', name: 'Anna', age: 16, location: 'Arendelle' },
			{ id: 'wern', name: 'Olaf', age: 2, location: 'North Pole' }
		],
    showPersons: false
	}

  nameChangedHandler = (event, id) => {
    // find the person we typed in by using findIndex
    // findIndex executes a func it on every item in the array
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // insert the desired person into a new object with all it's properties
    const person = {...this.state.persons[personIndex]};
    // update the copy of the object
    person.name = event.target.value;
    //
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    // copies the current state rather than changing original
    const persons =[...this.state.persons];
    persons.splice(personIndex,1); 
    this.setState({persons: persons});
  }

  togglePersonsHandler = (event, id) => {
    this.setState( { showPersons: !this.state.showPersons });
  }
 
  render() {
    const style = {
      backgroundColor: '#70a970',
      font: 'inherit',
      border: '1px solid #ccc',
      padding: '8px',
      cursor: 'pointer',
      boxShadow: '0 2px 2px #ccc',
      outline: 'none'
    }


    let persons = null;

    if (this.state.showPersons) {
      persons = 
        <div>
          {this.state.persons.map((person, index) => {
              return <Person 
                      click={() => this.deletePersonHandler(index)} 
                      name={person.name} age={person.age} 
                      location={person.location}
                      key={person.id} 
                      changed={(event) => this.nameChangedHandler(event, person.id)} />
            })}
        </div>
      style.backgroundColor = 'tomato';
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <=1) {
      classes.push('bold');
      classes = classes.join(' ');
    } 

   return (
     <div className="App">
       <h1>Participants</h1>
       <p className={classes} >Dynamically update classes</p>
       <button style={style}
       onClick={this.togglePersonsHandler}>Show/Hide persons</button>
       {persons}
     </div>
	 );
	}
}

export default App;
