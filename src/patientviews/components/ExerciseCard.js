import React, { Component } from 'react';
import NewCommentForm from '../../generalviews/NewCommentForm'
import CommentSection from '../../generalviews/CommentSection'
import YouTube from 'react-youtube'
import AppAdapter from '../../adapters/AppAdapter'

class ExerciseCard extends Component {

	renderNewComment = (comment) => {
		this.props.exercise.comments.push(comment)
	}

	handleFlagToggle = () => {
		AppAdapter.toggleFlag(this.props.exercise.id)
		.then(response => console.log(response))
	}

	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: {
				autoplay: 0
			}
		}
		return (
			<div>
				<h4>{this.props.exercise.name}</h4>
				<p>{this.props.exercise.desc}</p>
				<button onClick={this.handleFlagToggle}>{this.props.exercise.flagged ? "Unflag" : "Flag"}</button>
				<YouTube opts={opts} videoId={this.props.exercise.url}/>
				<div className='comments-section'>
					<CommentSection comments={this.props.exercise.comments}/>
					<NewCommentForm exercise={this.props.exercise} renderNewComment={this.renderNewComment}/>
				</div>
			</div>
		);
	}
}

export default ExerciseCard;
