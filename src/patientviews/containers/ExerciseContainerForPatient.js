import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { fetchComments } from '../../redux/actions/fetchComments'
import PatientExerciseCard from '../components/PatientExerciseCard'
import '../../stylesheets/patientviews.css'
import '../../stylesheets/effects.css'

class ExerciseContainerForPatient extends Component {

	componentDidMount(){
		console.log('exercise container mounted')
		if (this.props.patient) {
			console.log('fetching exercises from CDM')
			this.props.fetchExercises(this.props.patient.id)
		}
	}
	
	componentDidUpdate() {
		console.log('updating')
		if (this.props.patient) {
			console.log('fetching ex.')
			this.props.fetchExercises(this.props.patient.id)
		}
		if (this.props.exercises && !this.props.comments.length) {
			this.props.fetchComments(this.props.exercises.map(e => e.id))
		}
	}
	
	shouldComponentUpdate(nextProps) {
		console.log('in shouldComponentUpdate', nextProps)
		if (this.props.patient !== nextProps.patient) {
			return true
		} else if (this.props.exercises.length !== nextProps.exercises.length) {
			return true
		} 
		else if (this.props.comments.length !== nextProps.comments.length){
			return true
		} 
		else {
			return false
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
		console.log('render in exercise container')
		if (this.props.patient){
			return (
				<div className="patient-show">
					<h1 className="patient-name">{this.props.patient.last_name + ", " + this.props.patient.first_name}</h1>
						<h3 className="exercises-title">Exercises: </h3>
					<div className="exercise-container">
						{this.props.exercises ? this.renderExercises() : null}
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}

const mapStateToProps = (state) => {
	console.log("in mapStateToProps", state)
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

export default connect(mapStateToProps,mapDispatchToProps)(ExerciseContainerForPatient);
