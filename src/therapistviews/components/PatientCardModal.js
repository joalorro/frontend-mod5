import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'
import ExpandedExerciseCard from './ExpandedExerciseCard'
class PatientCardModal extends Component {

	state = {
		open: false
	}

	triggerClose = () => {
		this.setState({open: false})
	}

	renderExercises = () => {
		return this.props.exercises.map( e => {
			return <ExpandedExerciseCard exercise={e} />
		})
	}

	render() {
		return (
			<Modal 
			closeIcon
			className="patientcard-modal"
			open={this.state.open}
			onClose={this.triggerClose}
			>
				<Modal.Header className='patient-name-container'>
					<h1>{this.props.patient.last_name}, {this.props.patient.first_name}</h1>
				</Modal.Header>

				<Modal.Description>
					<h3 className="exercise-list">
						Exercise List:
					</h3>
				</Modal.Description>

				<Modal.Content >
					{this.renderExercises()}
				</Modal.Content>

			</Modal>
		);
	}
}

export default PatientCardModal;
