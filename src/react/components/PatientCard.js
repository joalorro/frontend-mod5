// import { fetchExercises } from '../../redux/actions/fetchExercises'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import '../../stylesheets/style.css'
import NewExerciseForm from './NewExerciseForm'

class PatientCard extends Component {
	
	state = { 
		newExercise: false
	}
	
	renderPatientExercises = () => {
		return this.props.exercises.map( e => {
			return (
				<div key={e.id}>
					<h4>Name: {e.name}</h4>
					<p>Desc: {e.desc}</p>
					<p>Flagged? {e.flagged ? "yes" : "no"}</p>
				</div>
			)
		})
	}

	toggleNewExerciseState = () => {
		this.setState(prevState => {
			return {
				newExercise: !prevState.newExercise
			}
		})
	}

	renderNewExerciseForm = () => {
		return <NewExerciseForm toggleNewExerciseState={this.toggleNewExerciseState} patientId={this.props.patient.id} therapistId={this.props.therapist.id} addExercise={this.addExercise}/>
	}

	addExercise = (exercise) => this.props.exercises.push(exercise)
	
	render() {
		console.log(this.props)
		return (
			<div className="patient-card">
				<h3 className="patient-name">{this.props.patient.last_name}, {this.props.patient.first_name}</h3>
					{this.renderPatientExercises()}
				<div className="btn-container">
					<button className="add-exercise-btn" onClick={this.toggleNewExerciseState}>+</button>
				</div>
				{this.state.newExercise ? this.renderNewExerciseForm() : null}
			</div>
		);
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchExercises: (patientId) => dispatch(fetchExercises(patientId))
// 	}
// }

const mapStateToProps = state => {
	return {
		therapist: state.sessionReducer.therapist
	}
}

export default connect(mapStateToProps)(PatientCard)
