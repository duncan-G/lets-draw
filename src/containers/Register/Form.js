import React from 'react';
import {
  Input,
  Button,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { Validators, FormBuilder } from '../../components/Form';

import './Register.css';

const Form = props => {
  return (
    <form
      id="registration-form"
      onSubmit={event => props.handleSubmit(event, props.login)}
    >
      <FormControl className="auth-form-field">
        <InputLabel htmlFor="email">Enter email</InputLabel>
        <Input name="email" label="Email" onChange={props.handleChange} />
        {props.formErrors.email && props.formErrors.email.length > 0 && (
          <FormHelperText className="auth-form-error">
            {props.formErrors.email[0]}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="auth-form-field">
        <InputLabel htmlFor="password">Enter password</InputLabel>
        <Input
          name="password"
          label="password"
          type="password"
          onChange={props.handleChange}
        />
        {props.formErrors.password && props.formErrors.password.length > 0 && (
          <FormHelperText className="auth-form-error">
            {props.formErrors.password[0]}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="auth-form-field">
        <InputLabel htmlFor="passwordConfirm">Confirm password</InputLabel>
        <Input
          name="passwordConfirm"
          label="passwordConfirm"
          type="password"
          onChange={props.handleChange}
        />
        {props.formErrors.password && props.formErrors.password.length > 0 && (
          <FormHelperText className="auth-form-error">
            {props.formErrors.passwordConfirm[0]}
          </FormHelperText>
        )}
      </FormControl>

      {props.loginError && (
        <FormHelperText className="auth-form-error">
          {props.loginError}
        </FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
        className="auth-submit-button"
      >
        Create an account
      </Button>
    </form>
  );
};

const RegisterForm = FormBuilder({
  email: {
    value: '',
    validators: [
      [Validators.isRequired, 'Email is required.'],
      [Validators.isEmail, 'Email is invalid.']
    ]
  },
  password: {
    value: '',
    validators: [
      [Validators.isRequired, 'Password is required.'],
      [Validators.isMinLength(6), 'Password must be atleast 6 character'],
      [
        Validators.isMaxLength(20),
        'Password cannot be longer than 20 characters.'
      ]
    ]
  },
  passwordConfirm: {
    value: '',
    validators: [[Validators.isRequired, 'Password is required.']]
  }
})(Form);

export default RegisterForm;
