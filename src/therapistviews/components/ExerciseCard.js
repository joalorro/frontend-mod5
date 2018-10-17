import React, { Component } from 'react';
import CommentSection from './CommentSection'

class ExerciseCard extends Component {

	state = {
		showComments: false
	}

	renderComments = () => {
		return <CommentSection />
	}

	handleClick = () => this.setState(prevState => ({showComments: !prevState.showComments}))

	render() {
		return (
			<div>
				<h4>{this.props.exercise.name}</h4>
				<p>Desc: {this.props.exercise.desc}</p>
				<p>Flagged? {this.props.exercise.flagged ? "Yes" : "No"}</p>
				<p>Video: {this.props.exercise.url}</p>
				{this.state.showComments ? this.renderComments() : null}
				<button onClick={this.handleClick}>{this.state.showComments ? "Hide Comments" : "Show Comments"}</button>
			</div>
		);
	}
}

export default ExerciseCard;
