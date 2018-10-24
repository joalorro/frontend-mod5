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
			
			<div>
				<h4>{this.props.exercise.name}</h4>
				<p>Desc: {this.props.exercise.desc}</p>
				<p>Flagged? {this.props.exercise.flagged ? "Yes" : "No"}</p>
				{/* <YouTube videoId={this.props.exercise.videoId} opts={opts} /> */}

				{this.state.showComments ? this.renderComments() : null}
				<button onClick={this.handleClick}>{this.state.showComments ? "Hide Comments" : "Show Comments"}</button>
			</div>
		);
	}
}

export default ExerciseCard;
