import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import '../../stylesheets/style.css'
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { openModal, closeModal } from '../../redux/actions/actions'
import { Button, Form, Modal } from 'semantic-ui-react'

class NewExerciseForm extends Component {
	
	constructor(props) {
		super(props);
		this.modalRef = React.createRef()
	}
	

	state = {		
		name: '',
		desc: '',
		url: '',
		patient_id: this.props.patient.id,
		therapist_id: this.props.therapistId,
		showModal: false
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => console.log('state', this.state))
	}

	handleSubmit = (e) => {
		// e.preventDefault()
		const {name, desc, url, patient_id, therapist_id} = this.state
		AppAdapter.createNewExercise({
			name, desc, url, patient_id, therapist_id
		}).then(res => res.json())
		.then(exerciseResponse =>{
			console.log('response from submission', exerciseResponse)
			if (!exerciseResponse.status){
				this.props.fetchExercises(this.props.therapistId)
			}
		})
		this.props.fetchExercises(this.props.therapistId)
		this.closeModal()
	}	

	closeModal = () => {
		this.setState({ showModal: false})
	}

	openModal = () => {
		this.setState({showModal: true})
	}

	render() {

		return (
			<Modal 
				closeIcon
				onClose={this.closeModal}
				open={this.state.showModal}
				className="exercise-form-background"
				trigger={<button className="add-exercise-btn"
						onClick={this.openModal}>+</button>}
			>

				<Modal.Header>New Exercise for {this.props.patient.first_name}</Modal.Header>
				<Modal.Content>

					<Form onSubmit={this.handleSubmit}>
						<Form.Field onChange={this.handleChange}>
							<label>Name</label>
							<input name="name" placeholder="Name" />
						</Form.Field>
						<Form.Field onChange={this.handleChange}>
							<label>Description</label>
							<textarea name ="desc" placeholder="Description" />
						</Form.Field>
						<Form.Field onChange={this.handleChange}>
							<label>URL</label>
							<input name ="url" placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
						</Form.Field>
						<Button type='submit'>Submit</Button>
					</Form>



				</Modal.Content>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		therapistId: state.sessionReducer.therapist.id,
		modalProps: state.modalReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExercises: (therapistId, model = "therapist") => {
			return dispatch(fetchExercises(therapistId,model))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewExerciseForm);
