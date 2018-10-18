import React, { Component } from 'react';
import CommentSection from '../../generalviews/CommentSection'
import YouTube from 'react-youtube'
import AppAdapter from '../../adapters/AppAdapter'

class PatientExerciseCard extends Component {

	state = {
		showComments: false
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
				<YouTube opts={opts} videoId={this.props.exercise.videoId}/>
				<CommentSection exerciseId={this.props.exercise.id} />
			</div>
		);
	}
}

export default PatientExerciseCard;
