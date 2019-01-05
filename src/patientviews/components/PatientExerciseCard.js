import React, { Component } from 'react';
import PatientCommentSection from './PatientCommentSection'
import YouTube from 'react-youtube'
import AppAdapter from '../../adapters/AppAdapter'
import { Icon } from 'semantic-ui-react'

import '../../css/patientviews.css'

class PatientExerciseCard extends Component {

	constructor(props){
		super(props)
		let className = this.props.exercise.flagged ? 'flagged' : ''
		this.state = {
			flagged: this.props.exercise.flagged,
			className,
			showConcernMsg: false
		}
	}

	handleFlagToggle = () => {
		AppAdapter.toggleFlag(this.props.exercise.id)
		.then(response => {
			let className = response ? 'flagged' : ''
			this.setState({
				flagged: response,
				className
			}, () => console.log(this.state))
		})
	}

	handleMouseOver = () => this.setState({ showConcernMsg: true })

	handleMouseOut = () => this.setState({ showConcernMsg: false })

	showConcernMsg = () => {
		let { flagged } = this.state
		let msg = flagged ? 'Concern Raised' : 'Raise Concern?'
		let color = flagged ? 'white' : 'red'
		let backgroundColor = flagged ? 'red' : 'white'
		return (
			<div className='concern-msg' style={ { color, background: backgroundColor} }>
				{msg}
			</div>
		)
	}

	displayConcernButton = () => {
		let iconName = this.state.flagged ? 'flag' : 'flag outline'
		
		return (
			<div className="flag-div">
				{this.state.showConcernMsg ? this.showConcernMsg() : null}
				<Icon enabled 
					name={iconName}
					className={this.state.className}
					onClick={this.handleFlagToggle} 
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
				/>
			</div> 
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
				{this.displayConcernButton()}
				<div className="exercise-name-div">
					<h4 className='exercise-name'>{this.props.exercise.name}</h4>
				</div>
				<div className="written-content">
					<p>{this.props.exercise.desc}</p>
				</div>
				<div className="video-container">
					<YouTube opts={opts} videoId={this.props.exercise.videoId}/>
				</div>
				<PatientCommentSection exerciseId={this.props.exercise.id} />
			</div>
		);
	}
}

export default PatientExerciseCard;
