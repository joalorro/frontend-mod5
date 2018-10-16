// import { fetchExercises } from '../../redux/actions/fetchExercises'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import '../../stylesheets/style.css'
import ExerciseCard from '../../patientviews/components/ExerciseCard'
import NewExerciseForm from './NewExerciseForm'

class PatientCard extends Component {
	
	state = { 
		newExercise: false,
		showComments: false
	}
	
	renderPatientExercises = () => {
		return this.props.exercises.map( e => {
			// return (
			// 	<div key={e.id}>
			// 		<h4>Name: {e.name}</h4>
			// 		<p>Desc: {e.desc}</p>
			// 		<p>Flagged? {e.flagged ? "yes" : "no"}</p>
			// 		{this.state.showComments ? this.renderComments(e.id) : null}
			// 		{/* <button onClick={() => this.setState(prevState => ({showComments: !prevState.showComments}))}>Show Comments</button> */}
			// 	</div>
			// )
			return (
				<ExerciseCard exercise={e}/>
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

	renderComments = (exerciseId) => {
		return (
			<div>

			</div>
		)
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

const mapStateToProps = state => {
	// const exerciseIds = state.exercises.map(e => e.id)
	return {
		therapist: state.sessionReducer.therapist,
		comments: state.commentsReducer.comments
	}
}

export default connect(mapStateToProps)(PatientCard)
