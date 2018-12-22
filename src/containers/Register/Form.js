import React from 'react';
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText
} from '@material-ui/core';
import { Validators, FormBuilder } from '../../components/Form2';

class Form extends React.Component {
  render() {
    return (
      <form
        onSubmit={event => this.props.handleSubmit(event, this.props.register)}
      >
        <h3>Login</h3>
        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
          className="registerFormBtn"
        >
          Submit
        </Button>
      </form>
    );
  }
}

const MaterialInput = props => (
  <FormControl>
    <InputLabel htmlFor={props.name}>{props.placeHolder}</InputLabel>
    <Input
      name={props.name}
      type={props.type ? props.type : 'text'}
      onChange={props.handleChange}
    />
    {props.renderError()}
  </FormControl>
);

const error = props => {
  if (props.error && props.error.length > 0) {
    return <FormHelperText>{props.error[0]}</FormHelperText>;
  } else {
    return;
  }
};

const LoginForm = FormBuilder({
  email: {
    value: '',
    name: 'email',
    placeHolder: 'Enter email',
    renderField: (props) => <MaterialInput {...props} />,
    validators: [
      [Validators.isRequired, 'Email is required.'],
      [Validators.isEmail, 'Email is invalid.']
    ]
  },
  password: {
    value: '',
    name: 'password',
    placeHolder: 'Enter password',
    renderField: (props) => <MaterialInput {...props} />,
    validators: [
      [Validators.isRequired, 'Password is required.'],
      [Validators.isMinLength(6), 'Should be atleast 6 characters.'],
      [Validators.isMaxLength(20), 'Should be less than 20 characters.']
    ]
  },
  passwordConfirm: {
    value: '',
    name: 'passwordConfirm',
    placeHolder: 'Confirm password',
    renderField: (props) => <MaterialInput {...props} />,
    validators: [
      [Validators.isRequired, 'Password confirmation is required.'],
      [Validators.match('password'), 'Does not match password']
    ]
  }
})(Form);

export default LoginForm;
