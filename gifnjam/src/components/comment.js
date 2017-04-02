import React, {Component} from 'react';
import api from '../api';

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: {
				username: 'Anonymous'
			}
		}
	}

	componentWillMount() {
		api.get(`user/${this.props.author}`)
			.then(res => this.setState({author: res.data}))
	}
	render() {
		const {author} = this.state;
		return (
			<div>
				<article className="media">
					<figure className="media-left">
				    <img src={author.profile_photo}  style={{width: 54}}/> 
				    <br/>
				    @{author.username}
				  </figure>
					<div className="media-content" style={{paddingLeft: 15}}>
						<div className="content">
							<a  className="image">
								<img src={this.props.gif} />
							</a>
						</div>
					</div>
				</article>
				<hr/>
			</div>
		);
	}
}