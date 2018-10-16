import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPatients } from '../../redux/actions/fetchPatients'
import { fetchExercisesByPT } from '../../redux/actions/fetchExercises'
import { fetchComments } from '../../redux/actions/fetchComments'
import PatientCard from '../components/PatientCard'
import '../../stylesheets/style.css'

class PatientsContainer extends Component {

	componentDidMount() {
		if (this.props.therapist){
			this.props.fetchPatients(this.props.therapist.id)
			this.props.fetchExercisesByPT(this.props.therapist.id)
		}
		if (this.props.exercises){
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
		comments: state.commentsReducer.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPatients: (therapistId) => {
			return dispatch(fetchPatients(therapistId))
		},
		fetchExercisesByPT: (therapistId) => {
			return dispatch(fetchExercisesByPT(therapistId))
		},
		fetchComments: (exerciseIds) => {
			return dispatch(fetchComments(exerciseIds))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientsContainer);
