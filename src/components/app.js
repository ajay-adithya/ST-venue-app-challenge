import React, { Component, Fragment } from "react";
import "./app.css";
import Header from "./header";
import Hero from "./hero";
import Navigation from "./navigation";
import Overview from "./overview";
import Reviews from "./reviews";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			language: "english",
			activeTab: "overview"
		};
		this.setLanguage = this.setLanguage.bind(this);
		this.setActiveTab = this.setActiveTab.bind(this);
	}

// Methods for setting language and setting active tab

	setLanguage (event) {
		 this.setState({language: event.target.value});
	}

	setActiveTab (event) {
		this.setState({activeTab: event.target.id});
	}


	render() {
		return <Fragment>
			<Header language={this.state.language} setLanguage={this.setLanguage}/>
			<Hero />
			<Navigation setActiveTab = {this.setActiveTab} activeTab = {this.state.activeTab}/>
			{	this.state.activeTab === "overview" ? 
				<Overview language={this.state.language}/> :
				<Reviews />
			}
			</Fragment>;
	}
}
