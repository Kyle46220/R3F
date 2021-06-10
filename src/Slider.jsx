import React from 'react';

// class Slider extends React.Component {
// 	render() {
// 		return (
// 			<input
// 				type="range"
// 				defaultValue={this.props.defaultValue}
// 				min={this.props.min}
// 				max={this.props.max}
// 				value={this.props.value}
// 				step={this.props.step}
// 				onChange={this.props.onChange}
// 				name={this.props.name}
// 			/>
// 		);
// 	}
// }
// export default Slider;

// import React from "react";
// import { render } from "react-dom";
// import { connect } from "react-redux";

// const THREE = require('three');
// this version works with the zustore componenet
// const Slider = ({ value, defaultValue, min, max, step, onChange }) => (
// 	<input
// 		type="range"
// 		defaultValue={defaultValue}
// 		min={min}
// 		max={max}
// 		value={value}
// 		step={step}
// 		onChange={onChange}
// 	/>
// );

//this one is for the valtio/gui version

const Slider = ({ value, defaultValue, min, max, step, setValue }) => (
	<input
		type="range"
		defaultValue={defaultValue}
		min={1}
		max={8}
		// value={value}
		step={step}
		onChange={(e) => setValue(e.currentTarget.value)}
	/>
);

export default Slider;
