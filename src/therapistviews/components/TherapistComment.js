import React from 'react';

const TherapistComment = ({comment:{commenter_name,content}}) => {
	return (
		<div>
			<p><span className="commenter-name">{commenter_name}: </span> <span className="comment-content">{content}</span> </p>
		</div>
	);
}

export default TherapistComment;
