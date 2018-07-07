import React from 'react';

const Errors = ({ errors }) => {
	return (
		<div className="ErrorObject">
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
