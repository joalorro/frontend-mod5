import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/patientviews.css'
import Comment from './Comment'
import PatientNewCommentForm from './PatientNewCommentForm'

const PatientCommentSection = ({comments,exerciseId}) => {
	
	const renderComments = () => {
		return comments.map( c => {
			return <Comment key={c.id} comment={c} />
		})
	}
	
	return (
		<div className="patient-comment-section">
			<div className="show-comments-area-for-patient">
				{renderComments()}
			</div>
			<div className="new-comment-form">
				<PatientNewCommentForm exerciseId={exerciseId} />
			</div>
		</div>	
	);
}

const mapStateToProps = (state,ownProps) => {
	return {
		comments: state.commentReducer.comments.filter( c => c.exercise_id === ownProps.exerciseId)
	}
}

export default connect(mapStateToProps)(PatientCommentSection)
