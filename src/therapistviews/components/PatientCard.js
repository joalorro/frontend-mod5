import { connect } from 'react-redux'
import React, { Component } from 'react';
import '../../stylesheets/style.css'
import '../../stylesheets/effects.css'
import SimpleExerciseCard from './SimpleExerciseCard'
import TherapistNewExerciseForm from './TherapistNewExerciseForm'
import { selectPatient, openModal, closeModal } from '../../redux/actions/actions'
import PatientCardModal from './PatientCardModal'

class PatientCard extends Component {
	
	constructor(props) {
		super(props);
		this.newExerciseRef = React.createRef()
		this.patientCardRef = React.createRef()
	}

	renderPatientExercises = () => {
		return this.props.exercises.map( e => {
			return <SimpleExerciseCard exercise={e} />
		})
	}

	handleSelect = () => {
		this.props.selectPatient(this.props.patient)
		console.log('patientCardRef before ', this.patientCardRef.current)
		this.patientCardRef.current.setState({open: true})
	}

	render() {
		console.log(this.props)
		return (
			<div className="patient-card hvr-border-fade">
				{/* Modals */}
				
				<PatientCardModal ref={this.patientCardRef}  {...this.props}/>

				<div onClick={this.handleSelect}>
					<div className="patient-name-container">
						<h3 className="patient-name">{this.props.patient.last_name}, {this.props.patient.first_name}</h3>
					</div>
					<div className="patient-card-exercises">
							{this.renderPatientExercises()}
					</div>	
				</div>

				<div className="btn-container">
					<TherapistNewExerciseForm patient={this.props.patient} />
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
		selectPatient: (patient) => dispatch(selectPatient(patient)),
		openModal: (modalProps) => dispatch(openModal(modalProps)),
		closeModal: (modalProps) => dispatch(closeModal(modalProps))
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientCard)
