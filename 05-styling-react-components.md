## Styling React Components

### Changing style dymamically
Let's go back to our Persons projects. We have a button in our `App.js` file which has inline style: 

**App.js**

```
//inline style:
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

In order to display this, we shohuld remove all uses of `radium` (and `StyleRoot`) from our code. We'll need to unlock the feature of CSS modules, and for that, we'll need access and edit the project's configuration. We'll use the command `eject` to get access to the configuration. This should be done carefully, because we don't want to break the setup (if you're using git to track your changes, make sure you `add` and `commit` your changes before running the `eject` command).

#### Unlocking CSS Modules

- Open the terminal 
- Run `npn run eject` to eject the configuration
- Click `y` when asked `? Are you sure you want to eject? This action is permanent. (y/N)` 
<<<<<<< HEAD
- You should see the message `Ejected successfully!`. 

You might notice two folders were added to your project: `scripts` and `config`. Inside the `config` folder, `webpack.config.dev` and `webpack.config.prod` files. Webpack is basically the build, the bundling tool that gets used. It applies all kind of optimisation for our project. 

Webpack is where we can change the way we handle CSS files, and unlock this extra feature using CSS modules. This is how:
 
- Go into `webpack.config.dev` and scroll down to `module` and then to the module where we spot the `css` extention (`css-loader`). We'll want to tweak the options for the CSS loader. The original configuration is: 

  ```
  {
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
  ```
  
- First, we should set `modules: true`, and `localIdentName`.  The latter is responsible to make sure that your styles will get unique names per component, so they don't overwrite each other. 

  ```
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      },
    },
  ```
- After adding this to `webpack.config.dev`, copy these configurations and go into `wepback.config.prod`. Search for `css-loader`. Don't change the existing setting, but add the copied configuration to this file.  

- Save the files, close them. 

With that, when we import `App.css` it will now scope the `CSS` classes within this `CSS` file to this component where we import it. So if we have the classes inside `App.css`, we can now import them from our css file. We should update the import statement and add a name for the class we're importing: 

```
import classes from './App.css';
```

Then, in order to reference a specific class you'll need to write: `classes`. For example, instead of `className='App'` we would write `className={classes}` to reference the same class name. You can do the same for the Person classes to apply the styling. 

What is going on here?  

The `css-loader` transforms the css classnames we set up into a unique one. It eventually takes the class name we defined, and some random hash to generate a unique name. It then stores all the unique names, where it can access them to apply the styling. 

### Adding Pseudo Selectors

Now, let's remove our `style` variable into our `css` files: 

```
.App button {
  background-color: #70a970;
  font: inherit;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 2px 2px #ccc;
  outline: none;
}

.App button:hover {
  background-color: darkseagreen;
}

.App button.red {
  background-color: tomato;
  color: black;
}

.App button.red:hover {
  background-color: salmon;
  color: black;
}
```

These classes are now available in the `App.js` since we imported it. We want our button to turn red after click. We can achieve this by: 

- Creating a variable to hold the button class. This variable should be an empty string when we start the app, and update to the red class after click. 
- Inside our `if (this.state.showPersons)` statement, add the class to the button by adding the line: `btnClass = classes.red;`. This will give our button the red class name. 
- The only thing left to do is to add the `btnClass` to our button, like so: 

  ```
  <button className={btnClass} onClick={this.togglePersonsHandler}>Show/Hide persons</button>
  ```

### Adding Media Queries

Css modules make media queries really easy. In order to add the media query we used earlier, all we need to do is to add this code to our `Person.css`: 

```
@media (min-width: 500px) {
  .Person {
    width: 450px;
  }
}
```

CSS-modules will make sure this media query will only apply for the component you specified. This makes things really easy to control. 