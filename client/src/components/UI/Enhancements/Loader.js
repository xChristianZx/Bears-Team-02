import React from 'react';
import ReactLoading from 'react-loading';
import classes from './Loader.css';

const Loader = props => {
	return (
		<div className="loaderContainer">
			<ReactLoading type="bars" color="#209cee" height={667} width={375} />
		</div>
	);
};

export default Loader;
