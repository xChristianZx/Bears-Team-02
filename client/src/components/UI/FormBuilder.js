import React from 'react';
import Errors from './Errors';

const FormBuilder = props => {
	const fields = props.fields.map(field => {
		return (
			<label>
				{field.label}:
				<input
					type={field.type}
					name={field.name}
					onChange={props.handleChange}
					value={props.currentState[field.name]}
				/>
			</label>
		);
	});

	return (
		<form onSubmit={props.handleSubmit}>
			<p className="error">{props.error}</p>

			{fields}
			<Errors errors={props.errors} />

			<button type="submit">{props.buttonText}</button>
		</form>
	);
};

export default FormBuilder;
