## Debugging React Apps

###Syntatic Errors

- Always have your console open when making changes to your app. 
- When an error occurs, always scroll all the way to the top, where the file name and line is mentioned. 
- Even if the error message is a bit cryptic - the file name and line number should be informative enough to find the problem. 

### Logic Errors 

Walk through your code step by step through the chrome dev tools: 
- open the sources tab 
- locate the file that contains the problematic function 
- click on the line inside the function to set a break point 
- Click `step into next function call` to see what happens next 
- Hover over variable names to see if they are equal to what you expect


### React Developer Tools

- download from the chrome webstore 
- you should see a new tab inside your console `react`
- you can see both the DOM elements and the components
- you'll also find props and state
- you can highlight updates in order to see what changed in your code 

### Using Error Boundries 

Error boundries were added in React 16. This feature is used for cases where you know your code might fail, and you can't control. The problematic component will be replaced by the error message we create.

Here is an example for an error boundry component: 

```
import React, { Component } from 'react';

class ErrorBoundry extends Component {
	state = {
		hasError: false,
		errorMessage: ''
	}

	componentDidCatch = (error, info) => {
		this.setState({ hasError: true, errorMessage: error});
	}

	render() {
		if (this.state.hasError) {
			return <h1>{this.state.errorMessage}</h1>;
		} else { return this.props.children; 
		}
	}
}

export default ErrorBoundry;
```

The component should be located like so: `src` > `ErrorBoundry` folder > `ErrorBoundry.js`. 

The component is a class which extends Component (just like we created the `App.js`). Inside the class we're keeping state of two properties: `hasError` (boolean), and `errorMessage` (string).

We'll also create a method `componentDidCatch` that will catch errors, and display the error messages. 

In the render method we have two possible outcomes: 
- Either there's an error and we display the method 
- Or we return the children of `ErrorBoundry`

Since we return `ErrorBoundry`'s children, we need to go to `App.js` and wrap the `Person` component with it. 

It should look like so: 

```
return <ErrorBoundry key={person.id} >
        <Person 
        click={() => this.deletePersonHandler(index)} 
        name={person.name} age={person.age} 
        location={person.location}
        changed={(event) => this.nameChangedHandler(event, person.id)} />
      </ErrorBoundry>
```

Important thing to note: we need to also move `key={person.id}` to the wrapper `ErrorBoundry`, because this is the outer element which we map. We want `key` to be on the element which we replicate. 

If we save the files and look at our app - we won't be able to see the changes. The reason is we're in development mode. Once we build this for production and ship to a server - we'll see whatever we render in our `ErrorBoundry`. 