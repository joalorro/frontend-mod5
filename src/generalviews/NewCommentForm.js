import React, { Component } from 'react';
import AppAdapter from '../adapters/AppAdapter'
import { connect } from 'react-redux';
import { fetchComments } from '../redux/actions/fetchComments'

class NewCommentForm extends Component {

	state = {
		content: '',
		exercise_id: this.props.exerciseId
	}

	handleChange = (e) => {
		this.setState({
			content: e.target.value
		}, () => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		AppAdapter.addComment(this.state)
		.then(res => res.json())
		.then(response => {
			this.props.fetchComments(this.props.exerciseIds)
			console.log(response)
		})
	}

	render() {
		return (
			<div >
				<form id={this.props.exerciseId} onSubmit={this.handleSubmit}>
					<textarea form={this.props.exerciseId} onChange={this.handleChange} ></textarea> <br />
					<input type="submit" ref={this.input}/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		exerciseIds: state.exerciseReducer.exercises.map( e => e.id )
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchComments: (exerciseIds) => dispatch(fetchComments(exerciseIds))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewCommentForm);
