import React, { Component } from 'react';
import AppAdapter from '../adapters/AppAdapter'

class NewCommentForm extends Component {
	
	constructor(props) {
		super(props);
		this.input = React.createRef()
	}
	

	state = {
		content: '',
		exercise_id: this.props.exercise.id
	}

	handleChange = (e) => {
		this.setState({
			content: e.target.value
		}, () => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		// debugger
		AppAdapter.addComment(this.state)
		.then(res=> res.json())
		.then(response=> console.log(response))
		this.props.renderNewComment(this.state)
	}

	render() {
		return (
			<div >
				<form id={this.props.exercise.id} onSubmit={this.handleSubmit}>
					<textarea form={this.props.exercise.id} onChange={this.handleChange} ></textarea> <br />
					<input type="submit" ref={this.input}/>
				</form>
			</div>
		);
	}
}

export default NewCommentForm;
