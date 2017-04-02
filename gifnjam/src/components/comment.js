import React, {Component} from 'react';
import api from '../api';

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: {}
		}
	}

	componentWillMount() {
		api.get(`user/${this.props.author}`)
			.then(res => this.setState({author: res.data}))
	}
	render() {
		return (
			<div />
		);
	}
}