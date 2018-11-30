import React from 'react';
import { connect } from 'react-redux'

const Comment = ({ patientId, comment:{commenter_name,content, commenter_id} }) => {
	console.log('patientId', patientId);
	console.log('commenterId', commenter_id);
	return (
		<div>
			<p><span className="commenter-name" style={ commenter_id ===  patientId ? { color: '#43cec4' } : { color: 'orange' } }>{commenter_name}: </span> <span className="comment-content">{content}</span> </p>
		</div>
	);
}

const mapStateToProps = ({ sessionReducer: { patient: { id } } }) => {
	return { patientId: id }
}

export default connect(mapStateToProps)(Comment);
