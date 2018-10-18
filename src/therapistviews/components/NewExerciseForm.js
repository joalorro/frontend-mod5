import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import '../../stylesheets/style.css'
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'

class NewExerciseForm extends Component {
	
	state = {
		name: '',
		desc: '',
		url: '',
		patient_id: this.props.patientId,
		therapist_id: this.props.therapistId
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		AppAdapter.createNewExercise(this.state).then(res=>res.json())
		.then(exerciseResponse =>{
			console.log(exerciseResponse)
			if (!exerciseResponse.status){
				this.props.toggleNewExerciseState()
				this.props.addExercise({
					id: exerciseResponse.id,
					name: exerciseResponse.name,
					desc: exerciseResponse.desc,
					flagged: exerciseResponse.flagged
				})
				this.props.fetchExercises(this.props.therapistId)
			}
		})
	}
	
	render() {
		return (
			<div className="exercise-form-background">
				<div className="exercise-form-div">
					<div className="x-btn-container">
						<button className="x-btn" onClick={this.props.toggleNewExerciseState}>X</button>
					</div>
					<form onSubmit={this.handleSubmit} >
						<label>Name: </label> <br />
						<input type="text" name="name" onChange={this.handleChange} /> <br />

						<label>Description: </label> 
						<input type="text" name="desc" onChange={this.handleChange} /><br />

						<label>Video Url: </label> <br />
						<input type="text" name="url" onChange={this.handleChange} /> <br />
						<input type="submit" />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		therapistId: state.sessionReducer.therapist.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExercises: (therapistId,model = "therapist") => {
			return dispatch(fetchExercises(therapistId,model))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewExerciseForm);
