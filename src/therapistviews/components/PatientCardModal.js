import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'

class PatientCardModal extends Component {

	state = {
		open: false
	}

	triggerClose = () => {
		this.setState({open: false})
	}

	render() {
		return (
			<Modal 
			closeIcon
			className="patientcard-modal"
			open={this.state.open}
			onClose={this.triggerClose}
			>
				<Modal.Header>
					<h1>{this.props.patient.last_name}, {this.props.patient.first_name}</h1>
				</Modal.Header>

				<Modal.Description>
					Exercise List:
				</Modal.Description>

				<Modal.Content >
					
					ISSHOBOI
				</Modal.Content>
			</Modal>
		);
	}
}

export default PatientCardModal;
