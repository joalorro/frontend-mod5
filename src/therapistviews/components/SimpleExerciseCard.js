import React from 'react';

const SimpleExerciseCard = (props) => {
	return (	
		<div className="exercise-card hvr-fade">
			<h4 className="category">{props.exercise.name}</h4>
			{/* <p><span className="category">Desc: </span>{props.exercise.desc}</p> */}
			<p><span className="category">Flagged? </span> {props.exercise.flagged ? "Yes" : "No"}</p>
		</div>
	);
}

export default SimpleExerciseCard;

