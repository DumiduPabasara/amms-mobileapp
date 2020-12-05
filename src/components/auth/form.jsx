import { Component } from 'react';

class Form extends Component {
	state = {
		data: {},
		errors: {}
	};

	validate = () => {
		const errors = {};

		const { error } = this.schema.validate(this.state.data, {
			abortEarly: false
		});

		if (error)
			for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const schema = this.schema.extract([name]);
		const { error } = schema.validate(value);
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

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};
}

export default Form;
