## Reaching out to the web: HTTP / Ajax

#### Sending HTTP requests (Typically): 

- If you have a single page app, you have a strong differantiation between the frontend, your react app, and your backend. 
- The react app and the server still need to communicate from time to time. But they don't communicate by exchanging HTML pages. So if a react app sends a request to a server, you don't get back a new HTML page. Instead, you get back some Json data, typically, or you send some Json data to the server. 
- Your server is a restful API. Just exposing some API endpoint to which you can send requests to get or send data from your standalon react app. 

Let's see how to do that. We're going to start a new project. We want to load dummy data from a server, so we'll use [json placeholder](https://jsonplaceholder.typicode.com/), which is a restful API backend where we can send requests to fetch dummy data, or to simulate storing dummy data (it won't store anything, of course).

We need some way of sending these Ajax requests, and we have two options: 

- JS has the XMLHTTP request object, with which we can construct our own Ajax request, send them to a specific URL. But writing and configuring requests with that object mannually is cumbersome. 
- The second option is using a third party library. We'll use [axios](https://github.com/axios/axios). This is not a react library - Axios can be used in any JS project. It fitst nicely into React. 

#### Installing Axios

- Quit the dev server with `ctrl`+ `c`
- Run `npm install axios --save`
- Restart your server with `npm start`

#### Creating a Http Request to GET Data

Our goal is to make an HTTP request (for dummy data), and then render the array of posts in our blog container (`containers/Blog/Blog.js`). Where do we make this HTTP request? 

If you remember the latest lesson, we mentioned there's one lifecycle hook during component creation we should use for side effects: `componentDidMount`.  HTTP request is a side affect: it doesn't affect our react logic, but it has a side affect of fetching new data. The data changing is a side affect, affecting our app. 

- Import axios in `blog.js`: `import axios from 'axios';`
- Implement `componentDidMount()` in `blog.js`:

	```
	componentDidMount () {
    	axios.get('https://jsonplaceholder.typicode.com/posts');
	}
	``` 
	- The get method needs at least one argument: the [URL](https://jsonplaceholder.typicode.com/posts) from which we want to get the data. 
	- You can send a second argument to configure this request, and axios has exellent documentation on Github. We won't use this option at this point. 
	- This should return some posts, but trying to store them in a `const post` won't work, because the `get` request happens a-synchronisly. It takes time to get to the server and fetch the data. 
	- JS executes the code in a synchronious manner, it won't pause until one call is finished. This is a wanted behaviour, because we wouldn't want the execution of our application to be blocked because the `get` method hadn't received the data. 
	- axios therefor uses promises: a default JS object introduced in ES6, and `get` returns a promise. Promises allow use of the `then` method. `then` is a method which takes a function as the input, and this function will get executed once the promise resolves, in other words, once the data from the backend is there. The function then receives a `response` object as an input. This will be passed into the function automatically by axios. For now, let's print that to the console by editing our `componentDidMount()`: 
	
	```
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                console.log(response);
        });
    }
	``` 
- After saving this we immediately see an object in the console. The status code (`200`) and additional fields provided by the axios package. The data object contains the data returned from the server we sent the request to. 

#### Rendering Fetched Data to the Screen

We now fetched the code to get some data. Our goal is to render this data to the screen inside our `Post` tags. 

We should start by adding a state to the classe, and add the posts from the response into `state.posts`. In order to do that, we must add `setState` **inside** `componentDidMount()`. Otherwise, since JS might try to access `response` before the response is achieved. 

```
// Add posts to state
state = {
    posts: []
}

componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            this.setState({posts: response.data});
    });
}
```

Next, we need to output posts dynamically in the `render()` method. We'll create an arry of posts by using `map()` on our fetched data, like so: 

```
const posts = this.state.posts.map( post => {
    return <Post />
}
);
```

If you look into `Post.js` you'll see we have a title field that is currently hard coded. We'd like to get props.title and set that field dynamically for each post, like so: `<h1>{props.title}</h1>`. To do this, we'll need to add props to each returned `<Post />` tag. Conviniently, there's a `title` property in our data, so we can use it in our `map()` method like so: 

```
const posts = this.state.posts.map( post => {
    return <Post title={post.title} />
}
);
```

You can now save and view the results. Our solution already works, but there are a few things to fix: 

1. Adding a key to each array items: the fetched data has an id property for each post: `key={posts.id}` 

2. Making frame wider to fit the content: edit the width of each post in the `.css` file to `width: 250px;` (originally set to 100px). 

3. The page currently displays all posts, which isn't necessary. 

	```
    componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({posts: updatedPosts});
    });
	}
	```
	In the `componentDidMount()` function above we've used `slice` to only select the first 4 posts. 
	We also created a constant variable in which we used our data to add an `author` field. If we'd like to add the author to eacht post we need to (1) pass it in as props, and (2) use it inside `post.js`: `<div className="Author">{props.author}</div>`.
	
	
### Making post selectable

Next, we want to be able to: (1) click a post, and (2) display it in the post component beneath. 

We'll can do this in a few simple steps: 

- Add an `onClick` listener inside `post.js`: `onClick={props.clicked}`
- Add a `clicked` props inside `blog.js`. It should pass the id of the specific post (se we know what to display): 

	```
	clicked={() => this.postSelectedHandler(post.id)}
	```
	
- Create `postSelectedHandler`: 

	```
    postSelectedHandler (id) {
        this.setState({selectedPostId: id});
    }
    ```
 
- Add the selected post id to `state`: 

	```
	    state = {
        posts: [],
        selectedPostId: null
    }
	```
- Inside `FullPost.js` set up a conditional that would either (1) ask user to select a post or (2) display the selected post. We can do this by checking if the post id is null or not: 

	```
	import React, { Component } from 'react';
	
	import './FullPost.css';
	
	class FullPost extends Component {
	    render () {
	        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
	        if (this.props.id) {
	            post = (
	                <div className="FullPost">
	                    <h1>Title</h1>
	                    <p>Content</p>
	                    <div className="Edit">
	                        <button className="Delete">Delete</button>
	                    </div>
	                </div>
	
	            );
	
	        }
	
	        return post;
	    }
	}
	
	export default FullPost;
	```

### Fetching data on update

When we learned about lifecycle hooks we mentioned it's the best place to cause side effects. However, we also mentioned we don't want to update the state there, because that would cause react to trigger re-rendering, which will lead to an infinite loop. 

We will now lean how we can fetch the data without triggering an infinite loop. 

We want to fetch the post with the specific Id we received, and display it in `FullPost` component. So inside `FullPost.js`:

- import axios: `import axios from 'axios';`
- implement `componentDidUpdate` to target one single post. We can use the url `'https://jsonplaceholder.typicode.com/posts/' + this.props.id` to go to the specific post URL. We're also checking that id isn't null: 

	```
    componentDidUpdate() {
        if (this.props.id) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data});
            });           
        }
    }
	```
	Inside our `h1` and `p` tags we can use the data we fetched: 
	
	```
	<h1>{this.state.loadedPost.title}</h1>
    <p>{this.state.loadedPost.body}</p>
	```
	
	If we save this and click on a post, we'll get an error. React is trying to load data into `h1` and `p` before it's completed fetching. We need to fix this with an if statement inside our `render()` method: 
	
	```
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.id) {
        post = <p>Loading...!</p>;
    } 
    if (this.state.loadedPost) {
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete">Delete</button>
                </div>
            </div>

        );

    }
	```
	
	This time, we first check if id exists, and if it does - we display 'Loading', because this means the user already selected a post. In the second `if` statement we're not checking if `id` exist, but rather we're checking if `state` has changed to the selected post. 
	
	Saving this would make things work, but if you check the `network` tab in chrome dev tools you'll see we're sending out requests infinitely. The reason is we're updating the state from withing componentDidUpdate. We have to make sure that we only send this HTTP request, and hence update the state, if we actually loaded a new post. 

	We can add an if check inside the outer if check, and check if we already loaded a post. This is the first indicator that we already loaded the post. We also want to make sure that for this loaded post the `id` isn't the same as we just got from our props. Because that would mean the id from which we want to fetch new data is the `id` we just loaded. So we don't need to make the request in that case. 
	
	This would look like so: 
	
	```
    componentDidUpdate() {
    if (this.props.id) {
        if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data});
            });   
        	}
    	}
	}
	```
	
	Note that we're checking if `!this.state.loadedPost` because this.state.loadedPost is initially null. 
	
### Posting data to the server 

We can experiment with POST inside `NewPost.js`. 

First, add a click listener to the button: `onClick={this.postDataHandler}`. 

Also, import axios, add a state to hold the data input, and create a `post` request. 

```
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content, 
            author: this.state.author
        };
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log(response)
            });
    }
```
	
Once you've implemented these, you should be able to see your post in the console. 

### Sending a DELETE request 

Our delete button is in our `fullPost` component. This won't actually delete anything since we're using dummy data, but here's how it should look: 

- We start by linking the button to a method that handles this.  
- Inside the method we'll write: 
	
	```
    deletePostHandler = () => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(response => {
            console.log(response); 
        });
	}
	```	
	
### Handling errors locally 

Requests sometimes fail, and it's important to learn how we can handle failed requests in axios. Using the `catch()` method allows us to catch errors better. 

First, let's see what an error looks like. If we add a random character to our URL in our `get()` request (in `blog.js`), we can see the console shows an error. 

We can get more information by using the `catch()` method, like so: 

```
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/postssss')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Michelle'
                    }
                });
                this.setState({posts: updatedPosts});
        })
            .catch(error => {
                console.log(error);
            });
    }
```	

Displaying the error in the console doesn't really help the user. We need to think of the user, and what they're seeing on the screen. Rather than display the error info in the console, it's better to (1) add an error message inside the UI to indicate to the user what they should do, and also (2) set up an `error` field inside `state` to update the error state. 

For example, we could add an `error` field to `state` and initialise it to `false`. 

Inside the `render()` method, just before the return statement, we'll write: 

	```
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
        posts = this.state.posts.map( post => {
            return <Post 
                        title={post.title} 
                        author={post.author} 
                        key={post.id} 
                        clicked={() => this.postSelectedHandler(post.id)} />
        }
    );}
	```
	
This way, if error is true -> the displayed text in `p` will let the user know that someting went wrong. Otherwise, we'll display everything as before.

### Adding interceptors to execute code globally

Handling errors locally in components makes sense, because we could do different things depending on which component we're at. But sometimes we'll want to execute code globally. We can do this with Axios with the help of [interceptors](https://github.com/axios/axios#interceptors). This is especialyl usefull for setting common headers, or for logging responsing. 

We'll add interceptors in `index.js`, which is our most global file we have in this app. 

Add this to the file (before `ReactDOM.render()`): 

```
import axios from 'axios';

axios.interceptors.request.use(request => {
	console.log(request);
});
```

Axios acts as an interceptors object. This will be shared across all files in our project, so it will affect all components in our app. Note that `use()` registers a new interceptor, and that interceptor takes a function as an input. We'll start by just logging the request to the console. If you save and go the console you'll see the object returned. Also, our app says `something went wrong`, because we're blocking the request. 

Inside our interceptor function we need to also return the request. Otherwise we're blocking the request. After adding 

```
import axios from 'axios';

axios.interceptors.request.use(request => {
	console.log(request);
	return request;
});
```

We can add a function which handles errors, like so: 

```
axios.interceptors.request.use(request => {
	console.log(request);
	return request;
}, error => {
	console.log(error);
	return Promise.reject(error);
});
```

`Promise.reject` error still forwards it to our request as we wrote in our component, where we then can handle it again with the catch method. 

We should do the same for `response`s as well: 

```
axios.interceptors.response.use(response => {
	console.log(response);
	return response;
}, error => {
	console.log(error);
	return Promise.reject(error);
});
```

### Setting a default global configuration for Axios

Sometimes we don't want to intercept the request, but we want to set up some global configuration. For example, if all of our requests and responses are handled in the same URL, we can set up a base URL in the `index.js` file. This way, we only need to specify the ending of the URL string, rather than using all of it. 

The way to do this in our case is: 

```
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
```

After adding this, we can remove the first part of the URL from our files (`blog.js`, `FullPost.js`, `NewPost`).

Other things to do with `default`: 

```
// acess default headers, and set a common header for authorization
// and set it to your Auth token
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// set headers for a specific request type: set the content type 
// This is done by default 
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

### Creating and using axois instances 

Being able to set a default config is great, but what if our base URL changes between different parts of our app, or if we want to set up a different auth token for a different part of our app? 

We can use instances to resolve this. 

- Create a file `axios.js` in the same folder as `index.js`
- Copy the code: 
	
	```
	import axios from 'axios';

	const instance = axios.create({
		baseURL: 'https://jsonplaceholder.typicode.com'
	});
	
	instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
	
	export default instance;
	```
- import `axios` instance from the file everywhere you'd like to use it. 