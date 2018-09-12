import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./hero.css";

class Hero extends Component {
	constructor(props) {
    super(props);

    this.goToLeftSlide = this.goToLeftSlide.bind(this);
    this.goToRightSlide = this.goToRightSlide.bind(this);

    this.state = {
      index: 0
    };
  }

// Begin Methods to scroll thorugh images

  goToLeftSlide(e) {
  	let index = this.state.index;
  	index--;
  	let images = this.props.listing.images;
  	if(index<0) {
  		index = images.length-1;
  	}
  	this.setState({index:index});
  }

   goToRightSlide(e) {
	  let index = this.state.index;
	  index++;
	  let images = this.props.listing.images;
	  if(index === images.length) {
	  		index = 0;
	  }
	  this.setState({index:index});
  }

// End Methods to scroll thorugh images
	render() {
		const { listing: { images = [], name, location = {} } = {} } = this.props;
		return <div className="hero">
			<img src={images[this.state.index]} alt="listing" />
			<a className="hero__arrow hero__arrow--left" onClick={e => this.goToLeftSlide(e)}>◀</a>
			<a className="hero__arrow hero__arrow--right" onClick={e => this.goToRightSlide(e)}>▶</a>
			<div className="hero__info">
				<p>{location.city}, {location.state}, {location.country}</p>
				<h1>{name}</h1>
			</div>
		</div>;
	}
}

const getHero = gql`
	query getHero {
		listing {
			name
			images
			location {
				city,
				state,
				country
			}
		}
	}
`;

/**
 * You shouldn't have to modify any code below this comment
 */

export default function HeroHOC(props) {
	return <Query
		query={getHero}
	>
		{({ data }) => (
			<Hero
				{...props}
				listing={data && data.listing || {}} // eslint-disable-line no-mixed-operators
			/>
		)}
	</Query>;
}
