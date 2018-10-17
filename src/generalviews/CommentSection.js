import React, { Component } from 'react';

class CommentSection extends Component {
	
	renderComments = () => {
		return this.props.comments.map( c => <li key={c.id} >
			{c.content}
		</li>)
	}

	render() {
		return (
			<div>
				<ul>
					{this.renderComments()}
				</ul>
			</div>
		);
	}
}

export default CommentSection;
