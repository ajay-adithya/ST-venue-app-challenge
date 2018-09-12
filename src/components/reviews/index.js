import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./reviews.css";
import StarIcon from "../icons/star";
import Review from "./review";
import CreateReview from "./create-review";

// Mutative Deletion happens here

const deleteReviewMutation = gql`
	mutation deleteReview(
		$id: String!
	) {
		deleteReview(
			id: $id
		) {
			id
		}
	}
`;

function Reviews({ reviews, getReviewsQuery }) {
	const length = reviews.length;
	var avgRating = 0;
	if(length !== 0) {
	avgRating = reviews.map(obj => {return obj.rating})
                  .reduce(function(a, b) { return a + b }) / length;
    }
	avgRating = Math.round(avgRating);
	let stars = [];
	for(var i=0; i<avgRating; i++)
	stars.push(<StarIcon />);
	return <div className="reviews">
		<div className="reviews__header">
			<h2>Reviews</h2>
			<div className="reviews__header__stars">
				{stars}
				{`(${length} reviews)`}
			</div>
		</div>
		{length ? <hr /> : ""}
		<table>
			<tbody>
			
				 <Mutation
				mutation={deleteReviewMutation} update={(cache, { data: { deleteReview } }) => {
					const { reviews } = cache.readQuery({ query: getReviewsQuery });
					cache.writeQuery({
					query: getReviewsQuery,
					data: { reviews: reviews.filter(e => e.id !== deleteReview.id)}
			});
		}}
		>	 
			{deleteReview => (
				reviews.map(r => (
				<Review key={r.id} review={r} onDeleteReview={deleteReview}/>
			)))}
				</Mutation>
			
			</tbody>
		</table>
		<hr />
		<CreateReview getReviewsQuery={getReviewsQuery} />
	</div>;
}

/**
 * You shouldn't have to modify any code below this comment
 */

const getReviews = gql`
	query getReviews {
		reviews {
			id
			rating
			author
			comment
			created_at
		}
	}
`;

export default function ReviewsHOC(props) {
	return <Query query={getReviews}>
		{({ data }) => (
			<Reviews
				{...props}
				getReviewsQuery={getReviews}
				reviews={data && data.reviews || []} // eslint-disable-line no-mixed-operators
			/>
		)}
	</Query>;
}
