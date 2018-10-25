import React, { Component } from 'react';
import PatientCommentSection from './PatientCommentSection'
import YouTube from 'react-youtube'
import AppAdapter from '../../adapters/AppAdapter'
import '../../stylesheets/patientviews.css'

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

	displayFlagButton = () => {
		let flagged = this.state.flagged ? "flagged" : "not-flagged"
		let flaggedText = this.state.flagged ? 'Flagged' : 'Not Flagged'
		
		return (
			<button onClick={this.handleFlagToggle}
					className={"flag-btn " + flagged}
				>{flaggedText}</button> 
		)
	}

	render() {
		const opts = {
			height: '152',
			width: '250',
			playerVars: {
				autoplay: 0
			}
		}
		return (
			<div className="patient-exercise-card hvr-fade">
				{this.displayFlagButton()}
				<h4>{this.props.exercise.name}</h4>
				<p>{this.props.exercise.desc}</p>
				
				<div className="video-container">
					<YouTube opts={opts} videoId={this.props.exercise.videoId}/>
				</div>
				<PatientCommentSection exerciseId={this.props.exercise.id} />
			</div>
		);
	}
}

export default PatientExerciseCard;
