## Styling React Components

### Changing style dymamically
Let's go back to our Persons projects. We have a button in our `App.js` file which has inline style: 

**App.js**

```
// inline style:
const style = {
      backgroundColor: '#8FBC8F',
      font: 'inherit',
      border: '1px solid #ccc',
      padding: '8px',
      cursor: 'pointer',
      boxShadow: '0 2px 2px #ccc',
      outline: 'none'
}

... 

<button style={style} >
```

We can use JS to dynamically change the button style. If, for example, we'd like to make the button background red after the button is clicked, we can use the `if` statement we're already using to `showPersons`. What we'd like to do is change one of the `style` properties, like so: 

```
style.backgroundColor = ' #DC143C';
style.color = 'white';
```

This means our `if` statement now looks like so: 

```
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
```

### Adding a className dynamically

We could also update an item's className dynamically. Our goal is to make our paragraph (1) red when there are only 2 (or less) items in the list, and also (2) make our paragraph bold if there is 1 (or less) item in the list. 

First, let's create an empty array of classes, and assign that variable to our paragraph's `className` attribute: 

```
let classes = [];

...

<p className={classes} >Dynamically update classes</p>
```

We now need to use `if` statements to make our code work as we'd like: 

```
let classes = [];
if (this.state.persons.length <= 2) {
  classes.push('red');
}
if (this.state.persons.length <=1) {
  classes.push('bold');
  classes = classes.join(' ');
} 
```

This block of code will assign the class `red` to our paragraph when there are two or less items in the list. It will also assign the class `bold` when there is one or less item on the list. You should add some styling to these classes in `App.js` to see if this works. Another way to see if it worked is by using the developer tools to click on the paragraph to check if the classes were indeed added. 


### Adding and using Radium

We want to add a `:hover` state to our button. One way to do this is by adding it to our `App.css` file, however that would be applied globally to all the buttons in our app. Yes, we can workaround this by using unique ideas, but let's resolve this inline to learn how.

We can do this by adding a popular third party package called Radium, which is a popular package for React that allows us to use  inline styles with psuedo selectors and media queries. 

- Navigate into your project folder 
- Run the command `npm install --save radium`. This will download and add the package to our project.
- Once the installation is complete, import radium into `App.js`: `import Radium from 'radium';`.
- Also, edit your last line of code in `App.js` into: `export default Radium(App);`.  

Now the package is imported into your project. Our app is now wrapped with the package. It's just a component wrapping our component which is adding some extra functionality and features. We can also use this in our other components. 

Let's start using the package by adding a hover style to our button inside `App.js`. Inside our `style` variable, we can now add styling for our hover state. Thanks to Radium, all pseudo selectors are now supported, but they have to be wrapped in quotations since they contain invalid charachters like `:`. The value should be our set of syles to this state. 

```
':hover': {
	backgroundColor: 'lightgreen',
}
```

We should also add a hover state in our `if` statement, which will add a different background color when the list is displayed.  

```
style.backgroundColor = 'tomato';
style[':hover'] = {
	backgroundColor: 'salmon',
}
```

### Media Queries 

We can add media queries in our `.css` files. However, if we want to change things dynamically OR if we want to scope something to a specific component - we'll do this inside that component. 

- First, add radium to our `Person.js`, the same way as we did in `App.js`.
- Create a `style` variable. 
- Inside `style` set up your media query: 

	```
	const style = {
		'@media (min-width: 500px)': {
			width: '450px'
		}
	};
	```
- Assign `style={style}` to your wrapping div. Note that despite having a style for `className`, this style will overwrite the rules as a result of CSS rules. 
	
Once you save your code, and click the button, you'll see the console is showing an error: `please wrap your application in the StyleRoot component`. This is a component made available by Radium. While wrapping the export statement with Radium is enough for pseudo selectors, for basically transforming selectors (@media queries, animation) we'll need to wrap the entire app with a special component provided by radium. To resolve this, do the following: 

- Go to your `App.js`
- Import `{ StyleRoot }` from 'radium'
- Wrap everything inside the return statement with an opnening and closing `<StyleRoot>` tag, like so: 

	```
   return (
    <StyleRoot>
     <div className="App">
       <h1>Participants</h1>
       <p className={classes} >Dynamically update classes</p>
       <button style={style}
       onClick={this.togglePersonsHandler}>Show/Hide persons</button>
       {persons}
     </div>
    </StyleRoot>
	 );
	```

### Enabling & Using CSS Modules

Using `CSS modules` allows us to make css files that are scoped to a specific JS component file. This way whichever style we declare in the CSS file could be assigned to the specific component without applying to the global scope. 

In order to display this, we shohuld remove all uses of `radium` (and `StyleRoot`) from our code. We'll need to unlock the feature of CSS modules, and for that, we'll need access and edit the project's configuration. We'll use the command `eject` to get access to the configuration. This should be done carefully, because we don't want to break the setup (if you're using git to track your changes, make sure you add and commit your changes before running the eject command).

