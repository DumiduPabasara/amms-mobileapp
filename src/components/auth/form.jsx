import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
	state = {
		data: {},
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().min(8).required().label('Password')
	};

	validate = () => {
		const errors = {};

		const { error } = Joi.validate(this.state.data, this.schema, {
			abortEarly: false
		});

		if (error)
			for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	validateProperty = object => {
		const schema = {
			username: Joi.string().label('Username'),
			password: Joi.string().min(8).label('Password')
		};

		const { error } = Joi.validate(object, schema);
		if (error) return error.details[0].message;
		return null;
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors });
		if (Object.keys(errors).length > 0) return;

		this.doSubmit();
	};

	handleChange = (value, name) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty({ [name]: value });
		if (errorMessage) errors[name] = errorMessage;
		else delete errors[name];

		const data = { ...this.state.data };
		data[name] = value;
		this.setState({ data, errors });
	};
}

export default Form;
