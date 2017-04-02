import React, { Component } from "react";
import Collapse from 'react-collapse';
import Comment from './comment';
import api from '../api';
import moment from "moment";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes || 0,
      id: props.id,
      reaction: false,
      liked: false
    };
  }

  getFormattedDate(createAt) {
    var now = moment();
    var date = moment(createAt);
    var ago = date.fromNow();
    console.log(ago);
    return ago;
  }

  handleLike(){
    const {id, liked} = this.state;
    api.post('post/like', {id, value: !liked && 1 || 0})
      .then(res => this.setState({liked: !liked}))
  }

  render() {
    const { user, gif, caption, likes, createdAt, comments } = this.props;
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
          <figure className="image">
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
            <div class="columns">
              <div class="column is-6">
                  {
                    comments.map((comment,i) => {
                      return <Comment key={i} gif={comment.gif_url} author={comment.author} />
                    })
                  }
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Card;
