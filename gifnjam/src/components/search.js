import React, { Component } from "react";
import { Throttle } from 'react-throttle';


class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes || 0,
      id: props.id
    };
  }

  render() {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column">
          <div className="field">
            <p className="control">
                <Throttle time="200" handler="onChange">
                    <input onChange={() => console.log('input')} />
                </Throttle>
              <input
                className="input is-large"
                type="text"
                placeholder="Search for a gif"
              />
            </p>
          </div>
        </div>
        <div className="column" />
      </div>
    );
  }
}
