import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { fetchComments } from '../../redux/actions/fetchComments'
import PatientExerciseCard from '../components/PatientExerciseCard'
import '../../stylesheets/style.css'

class PatientExercisesContainer extends Component {

	componentDidMount(){
		this.props.fetchExercises(this.props.patient.id)
	}

	componentDidUpdate() {
		if (this.props.exercises && !this.props.comments.length) {
			this.props.fetchComments(this.props.exercises.map(e => e.id))
		}
	}

	renderExercises = () => {
		return this.props.exercises.map( e => {
			return (
				<PatientExerciseCard exercise={e} key={e.id} />
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
		exercises: state.exerciseReducer.exercises,
		comments: state.commentReducer.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchExercises: (patientId, model = "patient") => {
			return dispatch(fetchExercises(patientId,model))
		},
		fetchComments: (exerciseIds) => dispatch(fetchComments(exerciseIds))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientExercisesContainer);
