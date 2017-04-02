import React, { Component } from "react";
import Card from "./components/card";
import Nav from "./components/header";
import NewJam from "./components/search";
import api from "./api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentUser: null
    };

    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost() {
    api
      .get("post")
      .then(posts =>
        this.setState((prevState, props) => ({
          posts: posts.data
        })))
      .catch(err =>
        console.log("something went wrong with fetching the posts", err));
  }

  componentWillMount() {
    api
      .get("post")
      .then(posts =>
        this.setState((prevState, props) => ({
          posts: this.state.posts.concat(posts.data)
        })))
      .catch(err =>
        console.log("something went wrong with fetching the posts", err));

    api
      .get("user")
      .then(users =>
        this.setState((prevState, props) => ({
          currentUser: users.data[0]
        })))
      .catch(err => console.log("something went wrong fetching the user", err));
  }

  render() {
    // const {posts} = this.state;
    return (
      <div className="App">
        <Nav />
        {this.state.currentUser && <NewJam onNewPost={this.onNewPost} author={this.state.currentUser} />}
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                {this.state.posts &&
                  this.state.posts.map((post, key) => {
                    console.log(post);
                    const {
                      id,
                      gif_url,
                      author,
                      caption,
                      likes,
                      createdAt,
                      comments
                    } = post;
                    return (
                      <Card
                        id={id}
                        author={this.state.currentUser} 
                        key={key}
                        user={author}
                        comments={comments}
                        gif={gif_url}
                        caption={caption}
                        likes={likes}
                        createdAt={createdAt}
                        onNewPost={this.onNewPost}
                        onLikePost={this.onNewPost}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
