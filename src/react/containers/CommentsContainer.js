import React, { Component } from 'react';
import { connect } from 'react-redux'
import Comment from '../components/Comment'


class CommentsContainer extends Component {

	componentDidMount() {
		// this.props.fetchComments(this.props.exerciseId)	
	}

	renderComments = () => {
		this.props.comments.map(c => <Comment comment={c} />)
	}

	render() {
		return (
			<div>
				Comments Container
				{this.renderComments()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		comments: state.commentsReducer.comments.filter(c => c.exercise_id === this.props.exerciseId)
	}
}

export default connect(mapStateToProps)(CommentsContainer);
