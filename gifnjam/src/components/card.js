import React, { Component } from "react";
import moment from "moment";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes || 0,
      id: props.id
    };
  }

  getFormattedDate(createAt) {
    var now = moment();
    var date = moment(createAt);
    var ago = date.fromNow();
    console.log(ago);
    return ago;
  }

  render() {
    const { user, gif, caption, likes, createdAt, comments } = this.props;
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
               <a className="level-item">
                <span className="icon is-large"><i className="fa fa-heart-o"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Card;
