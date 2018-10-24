import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import '../../stylesheets/style.css'
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'
import { Button, Form, Modal } from 'semantic-ui-react'

class NewExerciseForm extends Component {
	
	state = {
		name: '',
		desc: '',
		url: '',
		patient_id: this.props.patient.id,
		therapist_id: this.props.therapistId
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		}, () => console.log(this.state))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		AppAdapter.createNewExercise(this.state).then(res=>res.json())
		.then(exerciseResponse =>{
			console.log('response from submission', exerciseResponse)
			if (!exerciseResponse.status){
				this.props.toggleNewExerciseState()
				this.props.addExercise({
					id: exerciseResponse.id,
					name: exerciseResponse.name,
					desc: exerciseResponse.desc,
					flagged: exerciseResponse.flagged
				})
				this.props.fetchExercises(this.props.therapistId)
			}
		})
	}
	
	render() {

		return (
			<Modal className="exercise-form-background"
				trigger={<button className="add-exercise-btn">+</button>}
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

				{/* <div className="exercise-form-div">
					<div className="x-btn-container">
						<button className="x-btn" onClick={this.props.toggleNewExerciseState}>X</button>
					</div>
					<form onSubmit={this.handleSubmit} >
						<label>Name: </label> <br />
						<input type="text" name="name" onChange={this.handleChange} /> <br />

						<label>Description: </label> 
						<input type="text" name="desc" onChange={this.handleChange} /><br />

						<label>Video Url: </label> <br />
						<input type="text" name="url" onChange={this.handleChange} /> <br />
						<input type="submit" />
					</form>
				</div> */}
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		therapistId: state.sessionReducer.therapist.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExercises: (therapistId,model = "therapist") => {
			return dispatch(fetchExercises(therapistId,model))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewExerciseForm);
