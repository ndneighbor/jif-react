import React, { Component } from "react";
import Collapse from 'react-collapse';
import Comment from './comment';
import { Debounce } from "react-throttle";
import api from '../api';
import moment from "moment";
import axios from "axios";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes || 0,
      id: props.id,
      reaction: false,
      liked: false,
      query: "",
      result: "",
      authorId: props.author.id
    };

    this.postJam = this.postJam.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  postJam(event) {
    event.preventDefault();
    api.post("comment", {
        gif_url: this.state.result,
        post: this.state.id,
        author: this.state.authorId
    }).then(res => {
        this.props.onNewPost();
        this.setState((_,__) => ({
            query: "",
            result: ""
        }));
    }).catch(err => console.log("error post jam", err));
  }

  getFormattedDate(createAt) {
    var now = moment();
    var date = moment(createAt);
    var ago = date.fromNow();
    console.log(ago);
    return ago;
  }

  onSearch(event) {
    const query = event.target.value;
    const offset = Math.floor(Math.random() * 25);
    axios
        .get(`//api.giphy.com/v1/gifs/search?q=${query}&limit=1&offset=${offset}&api_key=dc6zaTOxFJmzC`)
        .then((response) => {
            console.log(response.data);
            var url = response.data.data[0].images.original.url || '';
            this.setState((_,__) => ({
                result: url
            }));
        })
        .catch((error) => console.log("error with giphy:", error));
  }
  

  handleLike(event){
    event.preventDefault();
    const {id, liked} = this.state;
    api.post('post/like', {id, value: !liked && 1 || 0})
      .then(res => {
        this.setState({liked: !liked});
        this.props.onLikePost();
      })
      
  }

  render() {
    const { user, gif, caption, likes, createdAt, comments, author } = this.props;
    const {reaction, liked} = this.state;
    console.log('liked: ', liked);
    return (
      <div className="card" style={{ marginBottom: 12 }}>

        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={user.profile_photo} alt="A Profile Here" />
              </figure>
            </div>
            <div className="media-content">
              <p
                style={{ color: "#402EA8", fontWeight: "bold" }}
                className="title is-6"
              >
                {`${user.first_name} ${user.last_name}`}
              </p>
              <p className="subtitle is-6">
                <small>{this.getFormattedDate(createdAt)}</small>
              </p>
            </div>
          </div>

          <div className="content">
            {caption}
            <br />
          </div>
        </div>
        <div className="card-image">
          <figure className="image" style={{paddingLeft: 16, paddingRight: 16}}>
            <img src={gif} alt="A Image Here" />
          </figure>
        </div>
        <div className="card-content">
          <nav className="level is-mobile">
            <div className="level-left">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Likes</p>
                  <p className="title">{likes}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Replies</p>
                  <p className="title">{comments.length}</p>
                </div>
              </div>
            </div>
            <div className="level-right">
               <a href="#" className="level-item" onClick={this.handleLike.bind(this)}>
                <span className="icon is-large"><i className={`fa ${liked && 'fa-heart' || 'fa-heart-o'}`}></i></span>
              </a>
            </div>
          </nav>
          <Collapse isOpened={reaction || true}>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                  {
                    comments.map((comment,i) => {
                      return <Comment key={i} gif={comment.gif_url} author={comment.author} />
                    })
                  }
              </div>
            </div>
            <div className="search-input-wrap">
                <figure className="profile-image">
                    <img src={author.profile_photo} alt="A Profile Here" />
                </figure>
                  <Debounce time="300" handler="onChange">
                    <input
                      className="input"
                      placeholder="Search for a gif"
                      onChange={this.onSearch}
                    />
                  </Debounce>
              </div>
              { this.state.result.length > 0 &&
                <div className="post-draft">
                    <figure className="image" style={{padding: 16}}>
                        <img src={this.state.result}/>
                    </figure>
                    <div className="bottom">
                        <button className="button" onClick={this.postJam}>
                            Post Jam
                        </button>
                    </div>
                </div>
              }
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Card;
