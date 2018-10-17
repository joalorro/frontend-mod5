import React, { Component } from 'react';
import CommentSection from '../../generalviews/CommentSection'
import YouTube from 'react-youtube'

class ExerciseCard extends Component {

	state = {
		showComments: false
	}

	renderComments = () => {
		return <CommentSection comments={this.props.comments}/>
	}

	handleClick = () => this.setState(prevState => ({showComments: !prevState.showComments}))

	onReady = (event) => {
		event.target.pauseVideo()
	}

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
				{/* <p>Video: {this.props.exercise.url}</p>
			 */}
				{/* <iframe title={this.props.exercise.name} width="300" height="500" src={this.props.exercise.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> */}
				<YouTube videoId={this.props.exercise.url} opts={opts} />

				{this.state.showComments ? this.renderComments() : null}
				<button onClick={this.handleClick}>{this.state.showComments ? "Hide Comments" : "Show Comments"}</button>
			</div>
		);
	}
}

export default ExerciseCard;
