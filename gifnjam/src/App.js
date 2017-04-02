import React, { Component } from 'react';
import Card from './components/card';
import api from './api';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount(){
    api.get('post')
      .then(posts => this.setState({posts}))
      .catch(err => console.log('something went wrong with fetching the psots', err));
  }

  render() {
    // const {posts} = this.state;
    return (
      <div className="App">
        <div className="App-header">



          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {
          this.state.posts.map(post => {
            console.log(post);  
            cosnt {author, gif_url,caption,likes,createdAt} = post;
            return <Card />
          })
        }
      </div>
    );

  }
}

export default App;
