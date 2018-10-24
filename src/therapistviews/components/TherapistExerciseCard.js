import React, { Component } from 'react';
import CommentSection from '../../generalviews/CommentSection'
import YouTube from 'react-youtube'

class ExerciseCard extends Component {

	state = {
		showComments: false
	}

	renderComments = () => {
		return <CommentSection exerciseId={this.props.exercise.id}/>
	}

	handleClick = () => this.setState(prevState => ({showComments: !prevState.showComments}))

	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: {
				autoplay: 0
			}
		}
		return (
			
			<div className="exercise-card hvr-fade">
				<h4 className="category">{this.props.exercise.name}</h4>
				<p><span className="category">Desc: </span>{this.props.exercise.desc}</p>
				<p><span className="category">Flagged? </span> {this.props.exercise.flagged ? "Yes" : "No"}</p>
				{/* <YouTube videoId={this.props.exercise.videoId} opts={opts} /> */}

				{this.state.showComments ? this.renderComments() : null}
				<div className="btn-container">
					<button className='ui inverted button' onClick={this.handleClick}>{this.state.showComments ? "Hide Comments" : "Show Comments"}</button>
				</div>
			</div>
		);
	}
}

export default ExerciseCard;
