import React, { Component } from 'react';
import PatientCommentSection from './PatientCommentSection'
import YouTube from 'react-youtube'
import AppAdapter from '../../adapters/AppAdapter'

class PatientExerciseCard extends Component {

	state = {
		showComments: false,
		flagged: this.props.exercise.flagged
	}

	handleFlagToggle = () => {
		AppAdapter.toggleFlag(this.props.exercise.id)
		.then(response => {
			this.setState({flagged: response})
		})
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
			<div className="patient-exercise-card">
				<h4>{this.props.exercise.name}</h4>
				<p>{this.props.exercise.desc}</p>
				<button onClick={this.handleFlagToggle}>{this.state.flagged ? "Unflag" : "Flag"}</button>
				<YouTube opts={opts} videoId={this.props.exercise.videoId}/>
				<PatientCommentSection exerciseId={this.props.exercise.id} />
			</div>
		);
	}
}

export default PatientExerciseCard;
