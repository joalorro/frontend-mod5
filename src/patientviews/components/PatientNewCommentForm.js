import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import { connect } from 'react-redux';
import { fetchComments } from '../../redux/actions/fetchComments'
import { Button } from 'semantic-ui-react'

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
		AppAdapter.addComment(this.state, this.props.commenterId, this.props.commenterType)
		.then(res => res.json())
		.then(response => {
			this.props.fetchComments(this.props.exerciseIds)
			console.log(response)
		})
		this.refs.commentContent.value = ""
	}

	render() {
		return (
			<div >
				<form className="patient-new-comment-form" id={this.props.exerciseId} onSubmit={this.handleSubmit}>
					<textarea className="patient-comment-body" form={this.props.exerciseId} onChange={this.handleChange} ref="commentContent"></textarea> <br />
					<Button type="submit" className="patient-comment-submit">Submit</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		exerciseIds: state.exerciseReducer.exercises.map( e => e.id ),
		commenterId: state.sessionReducer.therapist ? state.sessionReducer.therapist.id : state.sessionReducer.patient.id,
		commenterType: state.sessionReducer.therapist ? "therapist" : "patient"
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchComments: (exerciseIds) => dispatch(fetchComments(exerciseIds))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewCommentForm);
