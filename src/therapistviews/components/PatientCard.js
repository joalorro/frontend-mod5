import { connect } from 'react-redux'
import React, { Component } from 'react';
import '../../stylesheets/style.css'
import '../../stylesheets/effects.css'
import TherapistExerciseCard from './TherapistExerciseCard'
import NewExerciseForm from './NewExerciseForm'
import { selectPatient } from '../../redux/actions/actions'

class PatientCard extends Component {
	
	renderPatientExercises = () => {
		return this.props.exercises.map( e => {
			return (
				<TherapistExerciseCard exercise={e} />
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
		return <NewExerciseForm toggleNewExerciseState={this.toggleNewExerciseState} patient={this.props.patient} therapistId={this.props.therapist.id} addExercise={this.addExercise}/>
	}

	addExercise = (exercise) => this.props.exercises.push(exercise)
	
	handleSelect = () => {
		console.log("showing props on click ", this.props)
		this.props.selectPatient(this.props.patient)
	}

	render() {
		console.log(this.props)
		return (
			<div className="patient-card hvr-border-fade" onClick={this.handleSelect}>
				<div className="patient-name-container">
					<h3 className="patient-name">{this.props.patient.last_name}, {this.props.patient.first_name}</h3>
				</div>
				<div className="patient-card-contents">
						{this.renderPatientExercises()}
					<div className="btn-container">
						<NewExerciseForm toggleNewExerciseState={this.toggleNewExerciseState} patient={this.props.patient} therapistId={this.props.therapist.id} addExercise={this.addExercise}/>
					</div>
				</div>	
			</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		therapist: state.sessionReducer.therapist,
		selected: ownProps.patient === state.patientReducer.selectedPatient
	}
}

const mapDispatchToProps = dispatch => (
	{
		selectPatient: (patient) => dispatch(selectPatient(patient))
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientCard)
