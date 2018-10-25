import React from 'react';
import YouTube from 'react-youtube'
import TherapistCommentSection from './TherapistCommentSection'

const ExpandedExerciseCard = ({exercise}) => {

	const opts = {
		height: '350',
		width: '590',
		playerVars: {
			autoplay: 0
		}
	}

	return (
		<div>
			<div>
				<h4 >Name: {exercise.name}</h4>
			</div>
			
			<p>Description: {exercise.desc}</p>
			<p>Flagged? {exercise.flagged ? "Yes" : "No"}</p>
			
			<div className="btn-container">
				<YouTube videoId={exercise.videoId} opts={opts} className="centered" />
				<TherapistCommentSection exerciseId={exercise.id} />
			</div>

		</div>
	);
}

export default ExpandedExerciseCard;
