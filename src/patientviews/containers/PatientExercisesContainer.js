import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchExercisesByPatient } from '../../redux/actions/fetchExercises'
import ExerciseCard from '../components/ExerciseCard'
import '../../stylesheets/style.css'

class PatientExercisesContainer extends Component {

	componentDidMount(){
		this.props.fetchExercisesByPatient(this.props.patient.id)
	}

	renderExercises = () => {
		return this.props.exercises.map( e => {
			return (
				<ExerciseCard exercise={e} key={e.id} />
			)
		})
	}

	render() {
		return (
			<div className="patient-show">
				<h1>{this.props.patient.last_name + ", " + this.props.patient.first_name}</h1>
				<h3>Exercises: </h3>
				{this.props.exercises ? this.renderExercises() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	
	return {
		patient: state.sessionReducer.patient,
		exercises: state.exerciseReducer.exercises
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchExercisesByPatient: (patientId) => {
			return dispatch(fetchExercisesByPatient(patientId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientExercisesContainer);
