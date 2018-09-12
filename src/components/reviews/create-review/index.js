import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./create-review.css";
import StarIcon from "../../icons/star";

class CreateReview extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rating : 0
		}
		
		this.addReview = this.addReview.bind(this);
		this.changeRating = this.changeRating.bind(this);
	}

// Begin Methods to do star rating
	rate(rating) {
    	this.setState({rating: rating});
	}

	star_over(rating) {
    		this.setState({rating: rating});
	}

	changeRating (newRating) {
		this.setState({rating: newRating});
	}
	
// End Methods to do star rating

	addReview (event) {
			event.preventDefault();
			const data = new FormData(event.target);
			const author = data.get('author');
			const rating = this.state.rating;
			const comment = data.get('comment');
		 	this.props.onCreateReview({author, rating, comment });
		 	event.target.reset();
		 	this.changeRating(0);
	}
	render() {
		var stars = [];
		for(var i=1; i<=5; i++) {
			var star_style = 'star-icon';
			if (this.state.rating >= i && this.state.rating != 0) {
        			star_style += '-is-selected';
      			}
			stars.push(<StarIcon className={star_style} onClick={this.rate.bind(this, i)}
          		onMouseOver={this.star_over.bind(this, i)}/>);
		}
		return <div className="create-review">
			<h3>Write a Review</h3>
			<form onSubmit={this.addReview}>
				<label>Rate Your Experience</label>
				<div className="create-review__stars">	
						{stars}
				</div>
				<label htmlFor="create-review__author">Author</label>
				<input id="create-review__author" name="author"/>
				<label htmlFor="create-review__comment">Review</label>
				<textarea id="create-review__comment" name="comment"/>
				<button>Add Review</button>
			</form>
		</div>;
	}
}


const createReviewMutation = gql`
	mutation createReview(
		$author: String!,
		$rating: Int!,
		$comment: String!,
	) {
		createReview(
			author: $author
			rating: $rating
			comment: $comment
		) {
			id
			rating
			author
			comment
			created_at
		}
	}
`;

/**
 * You shouldn't have to modify any code below this comment
 */

export default function CreateReviewHOC(props) {
	return <Mutation
		mutation={createReviewMutation}
		update={(cache, { data: { createReview } }) => {
			const { reviews } = cache.readQuery({ query: props.getReviewsQuery });
			cache.writeQuery({
				query: props.getReviewsQuery,
				data: { reviews: [createReview].concat(reviews) }
			});
		}}
	>
		{(submitCreateReview, { data }) => (
			<CreateReview
				{...props}
				onCreateReview={variables => submitCreateReview({ variables })}
			/>
		)}
	</Mutation>;
}
