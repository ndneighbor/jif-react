import React, { Component } from "react";
import { Debounce } from "react-throttle";
import axios from 'axios';
import api from "../api";

export default class NewJam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: "",
      caption: "",
      authorId: props.author.id
    };

    this.postJam = this.postJam.bind(this);
    this.onCaptionChange = this.onCaptionChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  postJam(event) {
    event.preventDefault();
    api.post("post", {
        gif_url: this.state.result,
        caption: this.state.caption.trim(),
        author: this.state.authorId
    }).then(res => {
        this.props.onNewPost();
        this.setState((_,__) => ({
            caption:"",
            query: "",
            result: ""
        }));
    }).catch(err => console.log("error post jam", err));
  }

  onCaptionChange(event) {
    const value = event.target.value;
    this.setState((_,__) => ({
        caption: value
    }));
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
  

  render() {
    const {author} = this.props;
    return (
      <div className="section newjam">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
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
                    <input
                      className="input"
                      placeholder="Say something about this"
                      onChange={this.onCaptionChange}
                      value={this.state.caption}
                    />
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
