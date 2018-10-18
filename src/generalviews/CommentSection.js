import { connect } from 'react-redux';

import React from 'react';

const CommentSection = ({comments}) => {
	
	const renderComments = () => {
		return comments.map( c => {
			return (
				<li>
					{c.content}
				</li>
			)
		})
	}
	
	return (
		<div>
			{renderComments()}
		</div>
	);
}

const mapStateToProps = (state,ownProps) => {
	return {
		comments: state.commentReducer.comments.filter( c => c.exercise_id === ownProps.exerciseId)
	}
}

export default connect(mapStateToProps)(CommentSection)
