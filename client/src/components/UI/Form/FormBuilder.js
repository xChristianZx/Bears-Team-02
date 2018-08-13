import React from 'react';
import { reduxForm, Field, Form } from 'redux-form';

import './FormBuilder.css'; 
import formFieldRender from './formFieldRender';

let errorFields = [];

const FormBuilder = props => {
	const { handleSubmit } = props;
	const fields = props.fields.map(field => {
		errorFields.push(field)
		return (
			<Field
				key={field.name}
				label={field.label}
				name={field.name}
				type={field.type}
				component={formFieldRender}
			/>
		);
	});

	return (
		<Form className='Form' onSubmit={handleSubmit}>
      <h1 className="title" >{props.formTitle ? props.formTitle : null}</h1>
			{fields}
			<div className="buttons">			
				<button className='button is-success' type="submit">{props.buttonText}</button>					
				<button className='button is-danger is-outlined'>Clear</button>			
			</div>
			{props.errors}
		</Form>
	);
};

const validate = values => {
	const errors = {};

	errorFields.map(field => {
		let thisField = field.name;

		if (!values[thisField]) {
			errors[thisField] = field.errorMsg;
		}
		if (thisField === 'confirmPassword' && values.confirmPassword !== values.password) {
			errors[thisField] = 'Passwords do not match';
		}
		return errors; //Replacing for now to clear out warning message
	});
	return errors;
};

export default reduxForm({
  form: 'form',
	validate
})(FormBuilder)