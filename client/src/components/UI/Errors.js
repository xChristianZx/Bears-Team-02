import React from 'react';
import './Errors.css'

const Errors = ({ errors }) => {
	return (
		<div className="error">
			{Object.keys(errors).map((field, i) => {
				if (errors[field].length > 0) {
					return (
						<p key={i}>
							{field} {errors[field]}
						</p>
					);
				} else {
					return '';
				}
			})}
		</div>
	);
};

export default Errors;
