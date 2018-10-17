import React, { Component } from 'react';

class CommentSection extends Component {
	
	renderComments = () => {
		return this.props.comments.map( c => <p key={c.id}>
			{c.content}
		</p>)
	}
	
	render() {
		return (
			<div>
				{this.renderComments()}
			</div>
		);
	}
}

export default CommentSection;
