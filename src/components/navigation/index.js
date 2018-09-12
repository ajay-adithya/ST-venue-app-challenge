import React from "react";
import "./navigation.css";


export default function Navigation({setActiveTab, activeTab}) {
	return <div className="navigation">
		<a id = "overview" className = {activeTab === "overview" ? "is-selected" : null} onClick={setActiveTab} >Overview</a>
		<a id = "reviews" className = {activeTab === "reviews" ? "is-selected" : null} onClick={setActiveTab} >Reviews</a>
	</div>;
}
