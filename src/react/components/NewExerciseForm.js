import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'

class ExerciseForm extends Component {
	
	state = {
		name: '',
		desc: '',
		url: '',
		patientId: this.props.patientId,
		therapistId: this.props.therapistId
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		AppAdapter.createNewExercise(this.state)
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} >
					<input type="text" name="name" onChange={this.handleChange} />
					<input type="text" name="desc" onChange={this.handleChange} />
					<input type="text" name="url" onChange={this.handleChange} />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default ExerciseForm;
