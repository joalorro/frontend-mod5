import React from 'react';
import { connect } from 'react-redux';
import '../stylesheets/style.css'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'

const CommentSection = ({comments,exerciseId}) => {
	
	const renderComments = () => {
		return comments.map( c => {
			return <Comment key={c.id} comment={c} />
		})
	}
	
	return (
		<div className="comment-section">
			<div className="show-comments-area">
				{renderComments()}
			</div>
			<div className="new-comment-form">
				<NewCommentForm exerciseId={exerciseId} />
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
