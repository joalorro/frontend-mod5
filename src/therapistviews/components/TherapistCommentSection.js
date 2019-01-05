import React from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import TherapistComment from './TherapistComment'
import TherapistNewCommentForm from './TherapistNewCommentForm'

const CommentSection = ({comments,exerciseId}) => {
	
	const renderComments = () => {
		return comments.map( c => {
			return <TherapistComment key={c.id} comment={c} />
		})
	}
	
	return (
		<div className="therapist-comment-section">
			<div className="show-comments-area">
				{renderComments()}
			</div>
			<div className="new-comment-form">
				<TherapistNewCommentForm exerciseId={exerciseId} />
			</div>
		</div>	
	);
}

const mapStateToProps = (state,ownProps) => {
	return {
		comments: state.commentReducer.comments.filter( c => c.exercise_id === ownProps.exerciseId)
	}
}

export default connect(mapStateToProps)(CommentSection)
