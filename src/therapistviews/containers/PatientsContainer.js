import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPatients } from '../../redux/actions/fetchPatients'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { fetchComments } from '../../redux/actions/fetchComments'
import { selectPatient } from '../../redux/actions/actions'
import PatientCard from '../components/PatientCard'
import '../../css/style.css'

class PatientsContainer extends Component {

	componentDidMount() {
		if (this.props.therapist) {
			const therapistId = this.props.therapist.id
			this.props.fetchPatients(therapistId)
			this.props.fetchExercises(therapistId)
		}
	}
	
	componentDidUpdate() {
		if (this.props.therapist){
			const therapistId = this.props.therapist.id
			this.props.fetchPatients(therapistId)
			this.props.fetchExercises(therapistId)
		}
		if ( this.props.exercises.length && !this.props.comments.length) {
			this.props.fetchComments(this.props.exercises.map(e => e.id))
		}
	}

	shouldComponentUpdate(nextProps){
		// debugger
		if (this.props.therapist !== nextProps.therapist){
			return true 
		} else if ( this.props.patients.length !== nextProps.patients.length){
			return true
		} else if ( this.props.exercises.length !== nextProps.exercises.length) {
			return true
		} else if (this.props.comments.length !== nextProps.comments.length){
			return true
		} else {
			return false
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
		if (this.props.therapist){
			return (
				<div id="patient-index-outer">
					<div className='patient-name-div header'>
						<div className='patient-name-div-in-div'>
							<h1 className='therapist-name'>{this.props.therapist.last_name}, {this.props.therapist.first_name} </h1>
						</div>
					</div>

					<div className="patient-container">
						{this.props.exercises ? this.renderPatients() : null}
					</div>
				</div>
			);
		} else {
			return <div></div>
		}
	}
}

const mapStateToProps = (state) => {
	return {
		therapist: state.sessionReducer.therapist,
		patients: state.patientReducer.patients,
		exercises: state.exerciseReducer.exercises,
		comments: state.commentReducer.comments,
		selectedPatient: state.patientReducer.selectedPatient 
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
		fetchComments: (exerciseIds) => dispatch(fetchComments(exerciseIds)),
		selectPatient: (patient) => dispatch(selectPatient(patient))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientsContainer);
