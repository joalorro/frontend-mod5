import React, { Component } from 'react';
import NewCommentForm from '../../generalviews/NewCommentForm'
import CommentSection from '../../generalviews/CommentSection'

class ExerciseCard extends Component {

	render() {
		return (
			<div>
				<h4>{this.props.exercise.name}</h4>
				<p>{this.props.exercise.desc}</p>
				<p>{this.props.exercise.flagged}</p>
				<p>{this.props.exercise.url}</p>
				<div className='comments-section'>

					<NewCommentForm exercise={this.props.exercise} />
				</div>
			</div>
		);
	}
}

export default ExerciseCard;
