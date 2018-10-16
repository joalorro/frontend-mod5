import React, { Component } from 'react';
import NewCommentForm from './NewCommentForm'

class ExerciseCard extends Component {
	render() {
		return (
			<div>
				<h4>{this.props.exercise.name}</h4>
				<p>{this.props.exercise.desc}</p>
				<p>{this.props.exercise.flagged}</p>
				<p>{this.props.exercise.url}</p>
				<NewCommentForm exercise={this.props.exercise} />
			</div>
		);
	}
}

export default ExerciseCard;
