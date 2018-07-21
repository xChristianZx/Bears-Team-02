import React from 'react';

const formFieldRender = ({ input, label, type, meta: { touched, error } }) => (
	<div className="field">
		<label className="label">{label}</label>
		<div className="control">
			<input className="input" type={type} {...input} />
		</div>
		<p className="help is-danger">{touched && (error && <span>{error}</span>)}</p>
	</div>
);

export default formFieldRender