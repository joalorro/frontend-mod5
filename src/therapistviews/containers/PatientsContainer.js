import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPatients } from '../../redux/actions/fetchPatients'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { fetchComments } from '../../redux/actions/fetchComments'
import PatientCard from '../components/PatientCard'
import '../../stylesheets/style.css'

class PatientsContainer extends Component {

	componentDidMount() {
		if (this.props.therapist){
			const therapistId = this.props.therapist.id
			this.props.fetchPatients(therapistId)
			this.props.fetchExercises(therapistId)
		}
	}

	componentDidUpdate() {
		if ( this.props.exercises && !this.props.comments.length) {
			this.props.fetchComments(this.props.exercises.map(e => e.id))
		}
	}

	renderPatients = () => {
		return this.props.patients.map( p => {
			return <PatientCard key={p.id} patient={p} exercises={this.filterExercisesForPatient(p.id)} />
		})
	}

	filterExercisesForPatient = (patientId) => {
		return this.props.exercises.filter(e => e.patientId === patientId)
	}

	render() {
		return (
			<div className="patient-container">
				{this.props.exercises ? this.renderPatients() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		therapist: state.sessionReducer.therapist,
		patients: state.patientReducer.patients,
		exercises: state.exerciseReducer.exercises,
		comments: state.commentReducer.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPatients: (therapistId) => {
			return dispatch(fetchPatients(therapistId))
		},
		fetchExercises: (therapistId,model = "therapist") => {
			return dispatch(fetchExercises(therapistId,model))
		},
		fetchComments: (exerciseIds) => dispatch(fetchComments(exerciseIds))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientsContainer);
