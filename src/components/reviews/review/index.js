import React from "react";
import "./review.css";
import StarIcon from "../../icons/star";
import TrashIcon from "../../icons/trash";


export default function Review({
	onDeleteReview,
	review: {
		id,
		rating,
		author,
		comment,
		created_at
	} = {}
}) {
	var stars = [];
	for(var i=0; i< rating; i++)
			stars.push(<StarIcon />);
	var initials = author.match(/\b(\w)/g);
	var initial = initials.join('');
	var modifiedDate = new Date(created_at);
	modifiedDate = modifiedDate.getMonth() + 1 +'/'+ modifiedDate.getDate() + '/' +modifiedDate.getFullYear();
	return <tr className="review">
		<td className="review__initial">
			<div className="review__circle">
			{initial}
			</div>
		</td>
		<td className="review__info">
			<div className="review__info__author">
				{author}
			</div>
			<div className="review__info__date">
				{modifiedDate}
			</div>
		</td>
		<td className="review__details">
			<div className="review__details__rating">
				{stars}
			</div>
			<div className="review__details__comment">
				{comment}
			</div>
		</td>
		<td className="review__delete">
			<TrashIcon onClick={e => {onDeleteReview({ variables: { id: id }})}}/>
		</td>
	</tr>;
}
